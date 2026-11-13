import axios from "axios";

export type Post = { id: number; userId: number; title: string; body: string };

export async function getPosts(
  page: number,
  limit: number,
  signal?: AbortSignal,
) {
  const res = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    { params: { _page: page, _limit: limit }, signal },
  );
  const total = Number(res.headers["x-total-count"]);
  return { posts: res.data, total };
}
