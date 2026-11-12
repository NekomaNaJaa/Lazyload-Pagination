"use client";

import { useState } from "react";
import PageSizeSelect from "@/components/posts/PageSizeSelect";
import Pagination from "@/components/posts/Pagination";
import PostFeed from "@/components/posts/PostFeed";
import { DEFAULT_LIMIT, PAGE_SIZE_OPTIONS } from "@/components/posts/constants";

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  const changeLimit = (n: number) => {
    setLimit(n);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Posts</h1>

      <PageSizeSelect
        value={limit}
        options={PAGE_SIZE_OPTIONS}
        onChange={changeLimit}
      />

      <PostFeed
        key={`${page}-${limit}`}
        page={page}
        limit={limit}
        onTotal={setTotal}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </main>
  );
}
