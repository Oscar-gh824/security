import type { ChecklistGroup } from "../types";

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "moveIn",
    title: "전입신고 준비물",
    items: [
      { id: "moveIn-id", label: "신분증", detail: "주민등록증, 운전면허증 등" },
      { id: "moveIn-contract", label: "임대차계약서", detail: "원본 또는 사본" },
      { id: "moveIn-stamp", label: "도장 또는 서명", detail: "무인 신청 시 필요할 수 있어요" },
    ],
  },
  {
    id: "certifiedDate",
    title: "확정일자 준비물",
    items: [
      { id: "cert-contract-online", label: "임대차계약서 스캔본", detail: "인터넷등기소 업로드용", methods: ["online"] },
      { id: "cert-cert-online", label: "공동인증서", detail: "인터넷등기소 로그인 시 필요", methods: ["online"] },
      { id: "cert-contract-visit", label: "임대차계약서 원본", detail: "방문 접수 시 지참", methods: ["visit"] },
      { id: "cert-id-visit", label: "신분증", detail: "주민등록증, 운전면허증 등", methods: ["visit"] },
      { id: "cert-fee-visit", label: "수수료", detail: "방문 접수 시 소액의 수수료가 있어요", methods: ["visit"] },
    ],
  },
  {
    id: "rentReport",
    title: "전월세 신고 준비물",
    items: [
      { id: "rent-contract", label: "임대차계약서", detail: "표준계약서 권장" },
      { id: "rent-id", label: "신분증", detail: "임차인·임대인 모두" },
      { id: "rent-info", label: "임대인 정보", detail: "성명, 주소 등 계약서 기재 정보" },
    ],
  },
];
