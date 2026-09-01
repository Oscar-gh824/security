/**
 * 과태료 예상 범위 계산 (참고용 추정치)
 *
 * 법적 근거:
 * - 전입신고: 주민등록법 제40조제4항 — 정당한 사유 없이 14일 이내 미신고 시 5만원 이하 과태료
 *   (독촉을 받고도 신고하지 않으면 최대 10만원까지 가능). 시행령 부과기준상 지연 30일 이내 1~2만원,
 *   30~90일 3만원, 90일 초과 5만원 수준. 전입신고 과태료는 계약금액과 무관.
 * - 전월세 신고: 부동산 거래신고 등에 관한 법률 제28조 — 2025.5.31 계도기간 종료 이후(2025.6.1 신고분부터)
 *   단순 지연신고 과태료 상한이 100만원에서 30만원으로 인하됨. 실제 금액은 지연 기간과 계약금액을 함께
 *   반영한 시행령 별표3 매트릭스로 정해지며, 확인된 기준점은 계약금액 1억원 미만·지연 3개월 이하 2만원,
 *   계약금액 5억원 이상·지연 2년 초과(또는 공동신고 거부) 시 최대 30만원. 별표3의 중간 구간 전체 수치는
 *   공개된 자료에서 확인되지 않아, 이 계산기는 두 기준점 사이를 계약금액 비율로 선형 보간한 참고용
 *   추정치를 제공함 — 시행령상 실제 매트릭스와 다를 수 있음.
 *
 * 실제 부과 금액은 계약금액·지자체·개별 사정에 따라 달라질 수 있으니 반드시 공식 기관에서 확인하세요.
 */

export type PenaltyProcedure = "moveIn" | "rentReport";

export interface PenaltyEstimate {
  minWon: number;
  maxWon: number;
  note: string;
  /** 계약금액을 반영한 보간 추정값 (rentReport에서 계약금액 입력 시에만 제공) */
  pointWon?: number;
}

// 확인된 기준점: 1억원 미만은 최저 구간, 5억원 이상은 최고 구간
const RENT_REPORT_AMOUNT_FLOOR_MANWON = 10000; // 1억원
const RENT_REPORT_AMOUNT_CEIL_MANWON = 50000; // 5억원

function amountFraction(depositManwon: number): number {
  const clamped = Math.min(
    Math.max(depositManwon, RENT_REPORT_AMOUNT_FLOOR_MANWON),
    RENT_REPORT_AMOUNT_CEIL_MANWON
  );
  return (
    (clamped - RENT_REPORT_AMOUNT_FLOOR_MANWON) /
    (RENT_REPORT_AMOUNT_CEIL_MANWON - RENT_REPORT_AMOUNT_FLOOR_MANWON)
  );
}

function roundToThousand(won: number): number {
  return Math.round(won / 1000) * 1000;
}

export function estimatePenalty(
  procedure: PenaltyProcedure,
  daysLate: number,
  /** 계약금액 (보증금, 만원). rentReport에서만 사용 */
  depositAmountManwon?: number
): PenaltyEstimate {
  if (daysLate <= 0) {
    return { minWon: 0, maxWon: 0, note: "아직 기한이 지나지 않았어요." };
  }

  if (procedure === "moveIn") {
    if (daysLate <= 30)
      return { minWon: 10000, maxWon: 20000, note: "전입신고 지연 30일 이내 구간 추정치 (법정 상한 5만원)" };
    if (daysLate <= 90)
      return { minWon: 30000, maxWon: 30000, note: "전입신고 지연 30~90일 구간 추정치 (법정 상한 5만원)" };
    return {
      minWon: 50000,
      maxWon: 50000,
      note: "전입신고 지연 90일 초과 구간 추정치 (법정 상한 5만원). 독촉 후에도 미신고 시 최대 10만원까지 부과될 수 있어요.",
    };
  }

  // rentReport — 2025.6.1 시행분부터 단순 지연신고 상한 30만원 (계도기간 종료 반영).
  let range: { minWon: number; maxWon: number; note: string };
  if (daysLate <= 90) {
    range = {
      minWon: 20000,
      maxWon: 100000,
      note: "전월세 신고 지연 3개월 이내 구간. 계약금액 1억원 이하면 2만원 수준이에요.",
    };
  } else if (daysLate <= 730) {
    range = {
      minWon: 100000,
      maxWon: 250000,
      note: "전월세 신고 지연 3개월~2년 구간. 계약금액이 클수록 상단에 가까워져요.",
    };
  } else {
    range = {
      minWon: 250000,
      maxWon: 300000,
      note: "전월세 신고 지연 2년 초과 구간 (법정 상한 30만원, 계약금액 5억원 이상 기준). 허위 신고 시에는 최대 100만원까지 부과될 수 있어요.",
    };
  }

  if (depositAmountManwon === undefined || depositAmountManwon <= 0) {
    return range;
  }

  const fraction = amountFraction(depositAmountManwon);
  const pointWon = roundToThousand(range.minWon + fraction * (range.maxWon - range.minWon));
  return { ...range, pointWon };
}

export function formatWon(value: number): string {
  return `${value.toLocaleString()}원`;
}
