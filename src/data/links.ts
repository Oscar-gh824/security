import type { OfficialLink } from "../types";

export const officialLinks: OfficialLink[] = [
  {
    id: "gov24",
    label: "정부24 – 전입신고",
    description: "온라인으로 전입신고를 접수할 수 있어요.",
    url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A01010001&CappBizCD=13100000015",
  },
  {
    id: "iros",
    label: "인터넷등기소 – 확정일자",
    description: "임대차계약서의 확정일자를 온라인으로 받을 수 있어요.",
    url: "https://www.iros.go.kr",
  },
  {
    id: "rtms",
    label: "국토부 전월세신고 시스템",
    description: "임대차 계약 내용을 온라인으로 신고할 수 있어요.",
    url: "https://rtms.molit.go.kr",
  },
];
