import { useState } from "react";
import { DEFAULT_LIMIT } from "./constants";

export default function usePostsPage() {
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

  return { page, limit, totalPages, setTotal, goToPage, changeLimit };
}
