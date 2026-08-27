import type { CertifiedDateMethod as CertifiedDateMethodType } from "../types";
import { officialLinks } from "../data/links";
import { CertifiedDateMethodToggle } from "./CertifiedDateMethodToggle";
import { LinkIcon } from "./icons";

interface CertifiedDateMethodProps {
  method: CertifiedDateMethodType;
  onChange: (method: CertifiedDateMethodType) => void;
}

/** 확정일자 처리 방법(온라인/방문) 선택 및 방법별 안내 */
export function CertifiedDateMethod({ method, onChange }: CertifiedDateMethodProps) {
  const irosLink = officialLinks.find((l) => l.id === "iros");

  return (
    <div className="certified-date-method">
      <CertifiedDateMethodToggle method={method} onChange={onChange} />

      {method === "online" ? (
        <div className="certified-date-method-body">
          <p className="sub-text">
            인터넷등기소에서 공동인증서·금융인증서·간편인증 등으로 온라인 신청할 수 있어요. 임대차계약서
            스캔본과 수수료(약 500원)를 준비해주세요.
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
          있어요. 방문 시 수수료는 약 600원이에요.
        </p>
      )}
    </div>
  );
}
