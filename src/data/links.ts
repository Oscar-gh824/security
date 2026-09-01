import type { OfficialLink } from "../types";

export const officialLinks: OfficialLink[] = [
  {
    id: "gov24",
    label: "정부24 – 전입신고",
    description: "온라인으로 전입신고를 접수할 수 있어요.",
    url: "https://www.gov.kr/portal/onestopSvc/transferReport",
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
  {
    id: "myhome-center",
    label: "마이홈 – 관할 주민센터 찾기",
    description: "주소로 가까운 행정복지센터(주민센터)의 위치와 연락처를 확인할 수 있어요.",
    url: "https://www.myhome.go.kr/hws/portal/cont/selectAdministrativeWelfareCenter.do",
  },
];
