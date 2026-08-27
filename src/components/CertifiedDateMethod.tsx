import { useState } from "react";
import type { CertifiedDateMethod as CertifiedDateMethodType } from "../types";
import { officialLinks } from "../data/links";
import { LinkIcon } from "./icons";

const METHOD_LABEL: Record<CertifiedDateMethodType, string> = {
  online: "온라인",
  visit: "방문",
};

/** 확정일자 처리 방법(온라인/방문) 선택 및 방법별 안내 */
export function CertifiedDateMethod() {
  const [method, setMethod] = useState<CertifiedDateMethodType>("online");
  const irosLink = officialLinks.find((l) => l.id === "iros");

  return (
    <div className="certified-date-method">
      <div className="segmented" role="tablist" aria-label="확정일자 처리 방법">
        {(Object.keys(METHOD_LABEL) as CertifiedDateMethodType[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={method === key}
            className={method === key ? "active" : ""}
            onClick={() => setMethod(key)}
          >
            {METHOD_LABEL[key]}
          </button>
        ))}
      </div>

      {method === "online" ? (
        <div className="certified-date-method-body">
          <p className="sub-text">
            인터넷등기소에서 공동인증서로 온라인 신청할 수 있어요. 임대차계약서 스캔본을 준비해주세요.
          </p>
          {irosLink && (
            <a href={irosLink.url} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              <LinkIcon width={16} height={16} />
              {irosLink.label}
            </a>
          )}
        </div>
      ) : (
        <p className="sub-text certified-date-method-body">
          방문 접수: 주소지 관할 등기소 또는 주민센터에서 임대차계약서 원본과 신분증을 지참하면 받을 수
          있어요. 방문 시에는 소액의 수수료가 있어요.
        </p>
      )}
    </div>
  );
}
