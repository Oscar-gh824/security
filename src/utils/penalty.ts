/**
 * 과태료 예상 범위 계산 (참고용 추정치)
 *
 * 법적 근거:
 * - 전입신고: 주민등록법 제40조제4항 — 정당한 사유 없이 14일 이내 미신고 시 5만원 이하 과태료
 *   (독촉을 받고도 신고하지 않으면 최대 10만원까지 가능). 지연 기간별 시행령 부과기준을 참고한 추정치.
 * - 전월세 신고: 부동산 거래신고 등에 관한 법률 제28조 — 2026.5.31 계도기간 종료 이후(6.1 신고분부터)
 *   단순 지연신고 과태료 상한이 100만원에서 30만원으로 인하됨. 거래금액·지연기간에 따라 시행령 별표3 기준 차등 부과.
 *
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
    if (daysLate <= 30)
      return { minWon: 10000, maxWon: 20000, note: "전입신고 지연 30일 이내 구간 추정치 (법정 상한 5만원)" };
    if (daysLate <= 90)
      return { minWon: 20000, maxWon: 30000, note: "전입신고 지연 30~90일 구간 추정치 (법정 상한 5만원)" };
    return {
      minWon: 30000,
      maxWon: 50000,
      note: "전입신고 지연 90일 초과 구간 추정치. 독촉 후에도 미신고 시 최대 10만원까지 부과될 수 있어요.",
    };
  }

  // rentReport — 2026.6.1 시행분부터 단순 지연신고 상한 30만원 (계도기간 종료 반영)
  if (daysLate <= 30)
    return { minWon: 20000, maxWon: 40000, note: "전월세 신고 지연 30일 이내 구간 추정치 (2026.6.1~ 인하된 기준)" };
  if (daysLate <= 90)
    return { minWon: 40000, maxWon: 150000, note: "전월세 신고 지연 30~90일 구간 추정치 (2026.6.1~ 인하된 기준)" };
  return {
    minWon: 150000,
    maxWon: 300000,
    note: "전월세 신고 지연 90일 초과 구간 추정치 (법정 상한 30만원). 허위 신고 시에는 최대 100만원까지 부과될 수 있어요.",
  };
}

export function formatWon(value: number): string {
  return `${value.toLocaleString()}원`;
}
