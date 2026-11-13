"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TriangleAlertIcon } from "lucide-react";
import { useJumpScare } from "@/hooks/use-jump-scare";

const IMAGE_SRC = "/jumpscares.png"; // รูปใน public/
const WARNING_MS = 1000; // หน้าเตือนกี่มิลลิวินาที
const SCARE_MS = 2000; // รูปกี่มิลลิวินาที

export default function JumpScare() {
  const { phase, dismiss } = useJumpScare({
    warningMs: WARNING_MS,
    scareMs: SCARE_MS,
  });
  const reduceMotion = useReducedMotion(); // ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหวจะไม่เห็นเอฟเฟกต์ซูม

  return (
    <AnimatePresence>
      {phase === "warning" && (
        <motion.div
          key="warning"
          role="alert"
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-4 bg-black text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0 } }} // ตัดไปที่รูปทันที
          transition={{ duration: 0.2 }}
          onClick={dismiss}
        >
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <TriangleAlertIcon className="size-20" />
          </motion.div>
          <p className="text-4xl font-bold tracking-widest">CAUTION</p>
          <p className="text-lg">Jump scare ahead</p>
          <p className="text-sm text-yellow-400/60">กดเพื่อข้าม</p>
        </motion.div>
      )}

      {phase === "scare" && (
        <motion.div
          key="scare"
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }} // โผล่เร็วๆ ให้สะดุ้ง
          onClick={dismiss}
          role="img"
          aria-label="Jump scare"
        >
          <Image
            src={IMAGE_SRC}
            alt=""
            fill
            priority // โหลดล่วงหน้า ไม่ให้รูปโผล่ช้ากว่าหน้า
            className="object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
