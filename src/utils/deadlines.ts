import type { DeadlineResult, MoveInInfo } from "../types";
import { addDays, diffFromToday, formatDate, parseDate } from "./date";

/** 전입신고 법정 신고 기한 (전입일 기준) — 주민등록법 제16조제1항 */
const MOVE_IN_REPORT_DAYS = 14;
/** 전월세 신고 기한 (계약 체결일 기준) */
const RENT_REPORT_DAYS = 30;
/** 전월세 신고 대상 기준: 보증금(만원) 또는 월세(만원) 초과 시 — 부동산 거래신고 등에 관한 법률 시행령 */
const RENT_REPORT_DEPOSIT_THRESHOLD = 6000;
const RENT_REPORT_MONTHLY_THRESHOLD = 30;

export function calculateDeadlines(info: MoveInInfo): DeadlineResult[] {
  const moveIn = parseDate(info.moveInDate);
  const contract = parseDate(info.contractDate);
  const results: DeadlineResult[] = [];

  // 1. 전입신고
  if (moveIn) {
    const due = addDays(moveIn, MOVE_IN_REPORT_DAYS);
    results.push({
      id: "moveIn",
      title: "전입신고",
      applicable: true,
      dueDate: formatDate(due),
      dDay: diffFromToday(due),
      description: `전입일(${formatDate(moveIn)})로부터 ${MOVE_IN_REPORT_DAYS}일 이내에 새 주소지 관할 주민센터 또는 정부24에서 신고해야 해요. 정당한 사유 없이 넘기면 5만원 이하 과태료가 부과될 수 있어요.`,
      legalBasis: "주민등록법 제16조제1항, 제40조제4항",
    });
  }

  // 2. 확정일자 — 법정 마감일은 없지만 대항력·우선변제권 확보를 위해 전입일과 동시에 받는 걸 권장
  if (moveIn) {
    results.push({
      id: "certifiedDate",
      title: "확정일자",
      applicable: true,
      dueDate: formatDate(moveIn),
      dDay: diffFromToday(moveIn),
      description:
        "법으로 정해진 마감일은 없지만, 전입신고와 같은 날 받아야 대항력·우선변제권을 가장 빨리 확보할 수 있어요.",
      legalBasis: "주택임대차보호법 제3조, 제3조의2",
    });
  }

  // 3. 전월세 신고 (임대차 신고제)
  const isOverThreshold =
    info.depositAmount > RENT_REPORT_DEPOSIT_THRESHOLD ||
    info.monthlyRent > RENT_REPORT_MONTHLY_THRESHOLD;

  if (contract) {
    if (isOverThreshold) {
      const due = addDays(contract, RENT_REPORT_DAYS);
      results.push({
        id: "rentReport",
        title: "전월세 신고",
        applicable: true,
        dueDate: formatDate(due),
        dDay: diffFromToday(due),
        description: `계약 체결일(${formatDate(contract)})로부터 ${RENT_REPORT_DAYS}일 이내 국토부 전월세신고 시스템 또는 주민센터에서 신고해야 해요. 단순 지연신고 시 최대 30만원(2026.6.1 계도기간 종료 후 기준)의 과태료가 부과될 수 있어요.${
          info.contractType === "renewal"
            ? " 갱신 계약이면서 보증금·월세 금액 변동 없이 기간만 연장한다면 신고 대상에서 제외될 수 있으니 FAQ를 확인하세요."
            : ""
        }`,
        legalBasis: "부동산 거래신고 등에 관한 법률 제6조의2, 제28조",
      });
    } else {
      results.push({
        id: "rentReport",
        title: "전월세 신고",
        applicable: false,
        reasonIfNotApplicable: `보증금 ${RENT_REPORT_DEPOSIT_THRESHOLD.toLocaleString()}만원 이하 & 월세 ${RENT_REPORT_MONTHLY_THRESHOLD}만원 이하 계약은 신고 대상이 아니에요.`,
        description: "입력하신 금액 기준으로는 전월세 신고 의무가 없어요.",
      });
    }
  }

  return results;
}
