"use client";

import { motion } from "framer-motion";
import type { Post } from "@/lib/api";
import { CHUNK } from "./constants";

// สีวนตามเลขโพสต์ (ใบถัดไปได้สีถัดไป)
const CARD_COLORS = ["#00C9A7", "#FFB800", "#FF3D71", "#1E86FF", "#8B5CF6"];

type Props = {
  post: Post;
  index: number; // ลำดับในหน้านี้ ใช้คำนวณหน่วงเวลาตอนโผล่
};

export default function PostCard({ post, index }: Props) {
  const GROUP_SIZE = 10;
  const color =
    CARD_COLORS[Math.floor((post.id - 1) / GROUP_SIZE) % CARD_COLORS.length];

  return (
    <motion.li
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 40,
        // ไล่โผล่ทีละใบภายในก้อนเดียวกัน
        delay: (index % CHUNK) * 0.07,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25, delay: 0 },
      }}
      className="cursor-pointer rounded-2xl border bg-card p-4 text-card-foreground shadow-sm hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          {post.id}
        </div>

        <div className="min-w-0">
          <h2 className="line-clamp-1 text-base font-medium capitalize">
            {post.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            Author {post.userId} · Post #{post.id}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {post.body}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
