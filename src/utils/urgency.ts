export type UrgencyLevel = "overdue" | "recommended-overdue" | "urgent" | "soon" | "safe";

interface UrgencyOptions {
  /** false면 법정 마감일이 아니라 권장일이라, 지났을 때 "기한 지남"이 아니라 "권장일 지남"으로 표시 */
  isLegalDeadline?: boolean;
}

/** D-day 값에 따른 긴급도 단계 (D-day가 작을수록 위험) */
export function getUrgencyLevel(dDay: number | undefined, options?: UrgencyOptions): UrgencyLevel {
  const isLegalDeadline = options?.isLegalDeadline ?? true;
  if (dDay === undefined) return "safe";
  if (dDay < 0) return isLegalDeadline ? "overdue" : "recommended-overdue";
  if (dDay <= 3) return "urgent";
  if (dDay <= 7) return "soon";
  return "safe";
}

export function urgencyLabel(level: UrgencyLevel, dDay: number | undefined): string {
  if (level === "overdue") return `D+${Math.abs(dDay ?? 0)} 기한 지남`;
  if (level === "recommended-overdue") return `D+${Math.abs(dDay ?? 0)} 권장일 지남`;
  if (dDay === 0) return "D-DAY";
  return `D-${dDay}`;
}
