import { useEffect, useState } from "react";
import axios from "axios";
import { getPosts, Post } from "@/lib/api";
import { DEFAULT_LIMIT } from "@/hooks/constants";

type Result = {
  key: string;
  posts: Post[];
  total: number;
  error: boolean;
};

export function usePaginatedPosts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  // key บอกว่า "ตอนนี้ขอข้อมูลอะไรอยู่"
  const key = `${page}-${limit}-${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    getPosts(page, limit, controller.signal)
      .then((r) => {
        setResult({ key, posts: r.posts, total: r.total, error: false });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setResult((prev) => ({
          key,
          posts: [],
          total: prev?.total ?? 0,
          error: true,
        }));
      });

    return () => controller.abort();
  }, [page, limit, key]);

  // ค่าที่คำนวณต่อจาก state ไม่ต้องมี state แยก
  const loading = result === null || result.key !== key;
  const error = result?.key === key && result.error;
  const posts = result?.posts ?? [];
  const total = result?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  const changeLimit = (n: number) => {
    setLimit(n);
    setPage(1);
  };

  const retry = () => setAttempt((a) => a + 1);

  return {
    page,
    limit,
    posts,
    totalPages,
    loading,
    error,
    goToPage,
    changeLimit,
    retry,
  };
}
