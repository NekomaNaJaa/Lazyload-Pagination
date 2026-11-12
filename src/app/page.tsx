import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Lazy Load & Pagination</h1>
      <p className="mb-6 text-gray-600">
        Practice project using posts from JSONPlaceholder (100 items).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/posts"
          className="rounded border p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <h2 className="font-semibold">Posts Page</h2>
          <p className="text-sm text-gray-500">
            Page by page, choose 20 / 30 / 40 / 50 items per page.
            <br></br>Scroll, loads 5 items at a time.
          </p>
        </Link>
      </div>
    </main>
  );
}
