"use client";

import Link from "next/link";
import PostCard from "@/components/posts/PostCard";
import PostSkeleton from "@/components/posts/PostSkeleton";
import { LAZY_LOAD_CHUNK } from "@/hooks/constants";
import { useLazyLoad } from "@/hooks/use-lazy-load";

export default function LazyLoadPage() {
  const {
    items,
    total,
    loading,
    error,
    hasMore,
    skeletonCount,
    sentinelRef,
    retry,
  } = useLazyLoad();

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/">
          <p className="text-red-600">← Get Back!</p>
        </Link>
      </div>

      <h1 className="mb-4 mt-4 text-2xl font-bold">Lazy Load</h1>
      <p>100 items</p>
      <ul className="space-y-3">
        {items.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            delay={(i % LAZY_LOAD_CHUNK) * 0.07} // ไล่โผล่ภายในก้อนเดียวกัน
          />
        ))}

        {loading &&
          Array.from({ length: skeletonCount }, (_, i) => (
            <PostSkeleton key={`skeleton-${i}`} />
          ))}
      </ul>
      {loading && <p className="sr-only">กำลังโหลด...</p>}
      {error && (
        <p className="mt-4 text-destructive">
          โหลดข้อมูลไม่สำเร็จ{" "}
          <button className="underline" onClick={retry}>
            ลองใหม่
          </button>
        </p>
      )}
      {!hasMore && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          แสดงครบทั้งหมด {total} รายการแล้ว
        </p>
      )}
      {/* ตัวสังเกต: อยู่ท้ายลิสต์เสมอ */}
      <div ref={sentinelRef} className="h-4" />
    </main>
  );
}
