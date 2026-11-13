import { useCallback, useEffect, useState } from "react";

export type JumpScarePhase = "warning" | "scare" | "done";

type Options = {
  warningMs: number; // แสดงหน้าเตือนกี่มิลลิวินาที
  scareMs: number; // แสดงรูปกี่มิลลิวินาที
};

/**
 * ไล่ช่วง: warning → scare → done โดยเปลี่ยนเองตามเวลา
 */
export function useJumpScare({ warningMs, scareMs }: Options) {
  const [phase, setPhase] = useState<JumpScarePhase>("warning");

  useEffect(() => {
    if (phase === "done") return;

    const timer = setTimeout(
      () => setPhase(phase === "warning" ? "scare" : "done"),
      phase === "warning" ? warningMs : scareMs,
    );

    return () => clearTimeout(timer);
  }, [phase, warningMs, scareMs]);

  // กดข้ามได้ทุกช่วง
  const dismiss = useCallback(() => setPhase("done"), []);

  return { phase, dismiss };
}
