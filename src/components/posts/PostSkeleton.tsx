export default function PostSkeleton() {
  return (
    <li
      aria-hidden
      className="animate-pulse rounded-2xl border bg-card p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="size-10 shrink-0 rounded-2xl bg-muted" />

        <div className="min-w-0 flex-1">
          {/* ชื่อ: text-base = 24px */}
          <div className="flex h-6 items-center">
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>

          {/* เมตา: text-xs = 16px */}
          <div className="flex h-4 items-center">
            <div className="h-3 w-1/3 rounded bg-muted" />
          </div>

          {/* เนื้อหา: mt-2 + 2 บรรทัด text-sm = 20px ต่อบรรทัด */}
          <div className="mt-2">
            <div className="flex h-5 items-center">
              <div className="h-3 w-full rounded bg-muted" />
            </div>
            <div className="flex h-5 items-center">
              <div className="h-3 w-4/5 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
