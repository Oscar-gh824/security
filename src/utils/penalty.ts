/**
 * 과태료 예상 범위 계산 (참고용 추정치)
 * 실제 부과 금액은 지자체·개별 사정에 따라 달라질 수 있어요.
 */

export type PenaltyProcedure = "moveIn" | "rentReport";

export interface PenaltyEstimate {
  minWon: number;
  maxWon: number;
  note: string;
}

export function estimatePenalty(
  procedure: PenaltyProcedure,
  daysLate: number
): PenaltyEstimate {
  if (daysLate <= 0) {
    return { minWon: 0, maxWon: 0, note: "아직 기한이 지나지 않았어요." };
  }

  if (procedure === "moveIn") {
    if (daysLate <= 30) return { minWon: 40000, maxWon: 50000, note: "전입신고 지연 30일 이내 구간 추정치" };
    if (daysLate <= 60) return { minWon: 50000, maxWon: 80000, note: "전입신고 지연 30~60일 구간 추정치" };
    return { minWon: 80000, maxWon: 100000, note: "전입신고 지연 60일 초과 구간 추정치" };
  }

  // rentReport
  if (daysLate <= 30) return { minWon: 40000, maxWon: 150000, note: "전월세 신고 지연 30일 이내 구간 추정치" };
  if (daysLate <= 90) return { minWon: 150000, maxWon: 500000, note: "전월세 신고 지연 30~90일 구간 추정치" };
  return { minWon: 500000, maxWon: 1000000, note: "전월세 신고 지연 90일 초과 구간 추정치" };
}

export function formatWon(value: number): string {
  return `${value.toLocaleString()}원`;
}
