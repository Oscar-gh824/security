import type { CertifiedDateMethod } from "../types";

const METHOD_LABEL: Record<CertifiedDateMethod, string> = {
  online: "온라인",
  visit: "방문",
};

interface CertifiedDateMethodToggleProps {
  method: CertifiedDateMethod;
  onChange: (method: CertifiedDateMethod) => void;
}

/** 확정일자 처리 방법(온라인/방문) 선택 버튼 — 결과 카드와 체크리스트에서 함께 사용 */
export function CertifiedDateMethodToggle({ method, onChange }: CertifiedDateMethodToggleProps) {
  return (
    <div className="segmented" role="tablist" aria-label="확정일자 처리 방법">
      {(Object.keys(METHOD_LABEL) as CertifiedDateMethod[]).map((key) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={method === key}
          className={method === key ? "active" : ""}
          onClick={() => onChange(key)}
        >
          {METHOD_LABEL[key]}
        </button>
      ))}
    </div>
  );
}
