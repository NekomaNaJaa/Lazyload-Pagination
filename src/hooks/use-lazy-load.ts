import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getPosts, Post } from "@/lib/api";
import { LAZY_LOAD_CHUNK } from "@/hooks/constants";

export function useLazyLoad() {
  const [items, setItems] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadedPage, setLoadedPage] = useState(0);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loading = !error && loadedPage < page;
  const hasMore = loadedPage === 0 || items.length < total;

  // จำนวน skeleton ที่แสดงระหว่างโหลด
  const remaining = total > 0 ? total - items.length : LAZY_LOAD_CHUNK;
  const skeletonCount = Math.max(1, Math.min(LAZY_LOAD_CHUNK, remaining));

  // 1) โหลดข้อมูลเมื่อ page เปลี่ยน แล้วต่อท้ายรายการเดิม
  useEffect(() => {
    const controller = new AbortController();

    getPosts(page, LAZY_LOAD_CHUNK, controller.signal)
      .then((r) => {
        setItems((prev) => [...prev, ...r.posts]);
        setTotal(r.total);
        setLoadedPage(page);
      })
      .catch((e) => {
        if (!axios.isCancel(e)) setError(true);
      });

    return () => controller.abort();
  }, [page, attempt]);

  // 2) ตัวสังเกตท้ายลิสต์: เข้าจอ + ไม่ได้โหลดอยู่ + ยังมีเหลือ = ขอหน้าถัดไป
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore && !error) {
        setPage(loadedPage + 1);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, hasMore, error, loadedPage]);

  const retry = () => {
    setError(false);
    setAttempt((a) => a + 1);
  };

  return {
    items,
    total,
    loading,
    error,
    hasMore,
    skeletonCount,
    sentinelRef,
    retry,
  };
}
