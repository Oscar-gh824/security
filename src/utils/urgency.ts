export type UrgencyLevel = "overdue" | "urgent" | "soon" | "safe";

/** D-day 값에 따른 긴급도 단계 (D-day가 작을수록 위험) */
export function getUrgencyLevel(dDay: number | undefined): UrgencyLevel {
  if (dDay === undefined) return "safe";
  if (dDay < 0) return "overdue";
  if (dDay <= 3) return "urgent";
  if (dDay <= 7) return "soon";
  return "safe";
}

export function urgencyLabel(level: UrgencyLevel, dDay: number | undefined): string {
  if (level === "overdue") return `D+${Math.abs(dDay ?? 0)} 기한 지남`;
  if (dDay === 0) return "D-DAY";
  return `D-${dDay}`;
}
