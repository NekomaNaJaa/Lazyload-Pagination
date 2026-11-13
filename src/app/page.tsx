import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Lazy Load & Pagination</h1>
      <p className="mb-6 text-muted-foreground">
        Practice project using posts from JSONPlaceholder (100 items).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/lazyload"
          className="rounded-2xl border p-4 hover:shadow-md"
        >
          <h2 className="font-semibold">Lazy Load</h2>
          <p className="text-sm text-muted-foreground">
            scroll 100 items, loads 10 posts at a time.
          </p>
        </Link>

        <Link
          href="/pagination"
          className="rounded-2xl border p-4 hover:shadow-md"
        >
          <h2 className="font-semibold">Pagination</h2>
          <p className="text-sm text-muted-foreground">
            Page by page, choose 5 / 10 / 20 items per page.
          </p>
        </Link>
      </div>
    </main>
  );
}
