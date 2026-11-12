import axios from "axios";

export type Post = { id: number; userId: number; title: string; body: string };

export async function getPostsRange(
  start: number,
  count: number,
  signal?: AbortSignal,
) {
  const res = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    { params: { _start: start, _limit: count }, signal },
  );
  const total = Number(res.headers["x-total-count"]);
  return { posts: res.data, total };
}
