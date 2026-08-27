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
      { id: "cert-contract-online", label: "임대차계약서 스캔본", detail: "인터넷등기소 업로드용 (PDF, JPG 등)", methods: ["online"] },
      { id: "cert-auth-online", label: "본인인증 수단", detail: "공동인증서·금융인증서·간편인증(카카오·네이버 등) 중 택1", methods: ["online"] },
      { id: "cert-fee-online", label: "수수료", detail: "온라인 결제 약 500원 (카드·무통장입금·휴대폰결제)", methods: ["online"] },
      { id: "cert-contract-visit", label: "임대차계약서 원본", detail: "방문 접수 시 지참", methods: ["visit"] },
      { id: "cert-id-visit", label: "신분증", detail: "주민등록증, 운전면허증 등", methods: ["visit"] },
      { id: "cert-fee-visit", label: "수수료", detail: "방문 접수 시 약 600원", methods: ["visit"] },
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
