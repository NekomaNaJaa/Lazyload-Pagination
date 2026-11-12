"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getPostsRange, Post } from "@/lib/api";
import { CHUNK } from "./constants";
import PostCard from "./PostCard";

type Props = {
  page: number;
  limit: number;
  onTotal: (total: number) => void;
};

export default function PostFeed({ page, limit, onTotal }: Props) {
  const [items, setItems] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [chunk, setChunk] = useState(0);
  const [loadedChunks, setLoadedChunks] = useState(0);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const pageCount = Math.max(0, Math.min(limit, total - (page - 1) * limit));
  const loading = !error && loadedChunks < chunk + 1;
  const hasMore = loadedChunks === 0 || items.length < pageCount;

  useEffect(() => {
    const controller = new AbortController();
    const offset = chunk * CHUNK;
    const start = (page - 1) * limit + offset;
    const count = Math.min(CHUNK, limit - offset);

    getPostsRange(start, count, controller.signal)
      .then((r) => {
        setItems((prev) => [...prev, ...r.posts]);
        setTotal(r.total);
        onTotal(r.total);
        setLoadedChunks(chunk + 1);
      })
      .catch((e) => {
        if (!axios.isCancel(e)) setError(true);
      });

    return () => controller.abort();
  }, [chunk, attempt, page, limit, onTotal]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore && !error) {
        setChunk(loadedChunks);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, hasMore, error, loadedChunks]);

  const retry = () => {
    setError(false);
    setAttempt((a) => a + 1);
  };

  return (
    <section>
      <ul className="space-y-2">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>

      {loading && <p className="mt-4 text-gray-500">กำลังโหลด...</p>}

      {error && (
        <p className="mt-4 text-red-600">
          โหลดข้อมูลไม่สำเร็จ{" "}
          <button className="underline" onClick={retry}>
            ลองใหม่
          </button>
        </p>
      )}

      {!hasMore && (
        <p className="mt-4 text-gray-500">
          แสดงครบ {items.length} รายการของหน้านี้แล้ว
        </p>
      )}

      <div ref={sentinelRef} className="h-4" />
    </section>
  );
}
