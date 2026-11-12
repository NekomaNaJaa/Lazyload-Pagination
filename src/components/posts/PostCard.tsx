import type { Post } from "@/lib/api";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <li className="rounded border p-3">
      <span className="mr-2 text-gray-400">#{post.id}</span>
      {post.title}
    </li>
  );
}
