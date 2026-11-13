"use client";

import Link from "next/link";
import PageSizeSelect from "@/components/posts/PageSizeSelect";
import Pagination from "@/components/posts/Pagination";
import PostCard from "@/components/posts/PostCard";
import PostSkeleton from "@/components/posts/PostSkeleton";
import { PAGE_SIZE_OPTIONS } from "@/hooks/constants";
import { usePaginatedPosts } from "@/hooks/use-paginated-posts";

export default function PaginationPage() {
  const {
    page,
    limit,
    posts,
    totalPages,
    loading,
    error,
    goToPage,
    changeLimit,
    retry,
  } = usePaginatedPosts();

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/">
          <p className="text-red-600">← Get Back!</p>
        </Link>
      </div>
      <h1 className="mb-4 mt-4 text-2xl font-bold">Pagination</h1>

      <PageSizeSelect
        value={limit}
        options={PAGE_SIZE_OPTIONS}
        onChange={changeLimit}
      />

      {error && (
        <p className="mb-3 text-destructive">
          โหลดข้อมูลไม่สำเร็จ{" "}
          <button className="underline" onClick={retry}>
            ลองใหม่
          </button>
        </p>
      )}

      <ul className="space-y-3">
        {loading
          ? Array.from({ length: limit }, (_, i) => (
              <PostSkeleton key={`skeleton-${i}`} />
            ))
          : posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                delay={Math.min(i, 10) * 0.05} // ไล่โผล่ แต่ไม่เกิน 0.5 วินาที
              />
            ))}
      </ul>

      {loading && <p className="sr-only">กำลังโหลด...</p>}

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </main>
  );
}
