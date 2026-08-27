// 도메인 타입 정의

/** 신규 계약 / 갱신 계약 구분 */
export type ContractType = "new" | "renewal";

/** 이사 정보 입력 폼 값 */
export interface MoveInInfo {
  /** 전입일 (YYYY-MM-DD) */
  moveInDate: string;
  /** 계약 체결일 (YYYY-MM-DD) */
  contractDate: string;
  /** 보증금 (만원) */
  depositAmount: number;
  /** 월세 (만원, 없으면 0) */
  monthlyRent: number;
  /** 신규 계약인지 갱신 계약인지 */
  contractType: ContractType;
}

/** 확정일자 처리 방법 */
export type CertifiedDateMethod = "online" | "visit";

/** 개별 마감일 판정 결과 (전입신고, 전월세신고 등) */
export interface DeadlineResult {
  id: "moveIn" | "certifiedDate" | "rentReport";
  title: string;
  /** 대상 여부 (전월세신고처럼 조건부인 경우 false 가능) */
  applicable: boolean;
  /** 대상이 아닌 경우 사유 */
  reasonIfNotApplicable?: string;
  /** 마감일 (YYYY-MM-DD), 확정일자처럼 법정 마감일이 없는 경우 undefined */
  dueDate?: string;
  /** 오늘 기준 D-day (음수면 지남) */
  dDay?: number;
  description: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface OfficialLink {
  id: string;
  label: string;
  description: string;
  url: string;
}

export interface GlossaryTermData {
  id: string;
  term: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
