import type { GlossaryTermData } from "../types";

export const glossary: GlossaryTermData[] = [
  {
    id: "opposing-power",
    term: "대항력",
    description:
      "집이 다른 사람에게 팔리거나 넘어가도 '나는 이 집에 살 권리가 있다'고 새 주인에게 주장할 수 있는 힘이에요. 전입신고 + 실제 거주 다음 날 0시부터 생겨요.",
  },
  {
    id: "priority-repayment",
    term: "우선변제권",
    description:
      "집이 경매에 넘어갔을 때, 다른 채권자보다 먼저 보증금을 돌려받을 수 있는 권리예요. 대항력 + 확정일자를 모두 갖춰야 인정돼요.",
  },
  {
    id: "certified-date",
    term: "확정일자",
    description:
      "임대차계약서에 '이 날짜에 계약이 존재했다'는 걸 증명해주는 도장이에요. 우선변제권을 받기 위한 필수 조건이에요.",
  },
  {
    id: "rent-report-system",
    term: "전월세 신고제",
    description:
      "일정 금액 이상의 전월세 계약을 맺으면 계약 내용을 지자체에 신고하도록 한 제도예요. 신고할 때 임대차계약서를 함께 제출하면 확정일자를 받은 것과 같은 효력이 자동으로 생겨요.",
  },
];
