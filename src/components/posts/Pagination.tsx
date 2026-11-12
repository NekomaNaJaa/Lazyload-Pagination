type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 0) return null;

  return (
    <nav className="mt-6 flex flex-wrap items-center gap-2">
      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`rounded border px-3 py-1 ${
            p === page ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>

      <span className="ml-2 text-gray-500">
        หน้า {page} จาก {totalPages}
      </span>
    </nav>
  );
}
