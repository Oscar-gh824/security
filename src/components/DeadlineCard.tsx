import type { CertifiedDateMethod as CertifiedDateMethodType, DeadlineResult } from "../types";
import { formatDateKorean, parseDate } from "../utils/date";
import { buildGoogleCalendarUrl } from "../utils/ics";
import { getUrgencyLevel, urgencyLabel } from "../utils/urgency";
import { CertifiedDateMethod } from "./CertifiedDateMethod";
import { GlossaryTerm } from "./GlossaryTerm";
import { CalendarIcon, LinkIcon } from "./icons";
import { officialLinks } from "../data/links";

const LINK_MAP: Record<string, string[]> = {
  moveIn: ["gov24"],
  rentReport: ["rtms"],
};

const GLOSSARY_MAP: Record<string, string[]> = {
  moveIn: [],
  certifiedDate: ["opposing-power", "priority-repayment"],
  rentReport: ["rent-report-system"],
};

/**
 * 기한이 지났을 때 보여주는 대처 안내.
 * "자진납부 시 20% 감경"은 질서위반행위규제법 제18조 근거 — 과태료 사전통지를 받은 뒤
 * 통지된 의견제출기한(통상 10일 이상) 내에 납부해야 적용되는 것이라, "지금 신고하면 감경"이
 * 아니라 "나중에 통지받으면 그 기한 내 납부 시 감경"으로 정확히 표현해야 함.
 */
const OVERDUE_CTA: Record<string, string> = {
  moveIn:
    "더 늦어지기 전에 지금 바로 신고하세요. 나중에 과태료 사전통지를 받으면, 통지에 적힌 기한 안에 자진납부할 경우 20% 감경받을 수 있어요.",
  rentReport:
    "더 늦어지기 전에 지금 바로 신고하세요. 나중에 과태료 사전통지를 받으면, 통지에 적힌 기한 안에 자진납부할 경우 20% 감경받을 수 있어요.",
  certifiedDate:
    "아직 못 받으셨다면 지금 바로 받아서 대항력·우선변제권을 확보하세요. 늦어질수록 그 사이 생긴 문제에 대해 보호받지 못할 수 있어요.",
};

interface DeadlineCardProps {
  deadline: DeadlineResult;
  certifiedDateMethod: CertifiedDateMethodType;
  onCertifiedDateMethodChange: (method: CertifiedDateMethodType) => void;
}

export function DeadlineCard({
  deadline,
  certifiedDateMethod,
  onCertifiedDateMethodChange,
}: DeadlineCardProps) {
  if (!deadline.applicable) {
    return (
      <div className="card deadline-card deadline-card--muted">
        <div className="deadline-card-head">
          <h3>{deadline.title}</h3>
          <span className="badge badge-safe">대상 아님</span>
        </div>
        <p className="sub-text">{deadline.reasonIfNotApplicable}</p>
      </div>
    );
  }

  const level = getUrgencyLevel(deadline.dDay, { isLegalDeadline: deadline.id !== "certifiedDate" });
  const dueDate = deadline.dueDate ? parseDate(deadline.dueDate) : null;
  const links = (LINK_MAP[deadline.id] ?? [])
    .map((id) => officialLinks.find((l) => l.id === id))
    .filter(Boolean);
  const googleCalendarUrl = buildGoogleCalendarUrl(deadline);

  return (
    <div className={`card deadline-card deadline-card--${level}`}>
      <div className="deadline-card-head">
        <h3>
          {deadline.title}
          {GLOSSARY_MAP[deadline.id]?.map((g) => (
            <GlossaryTerm key={g} termId={g} />
          ))}
        </h3>
        {deadline.dDay !== undefined && (
          <span className={`badge badge-${level}`}>{urgencyLabel(level, deadline.dDay)}</span>
        )}
      </div>

      {dueDate && (
        <p className="deadline-date">
          <CalendarIcon width={16} height={16} />
          {deadline.id === "certifiedDate" ? "권장일" : "마감일"}: {formatDateKorean(dueDate)}
        </p>
      )}

      <p className="deadline-desc">{deadline.description}</p>

      {(level === "overdue" || level === "recommended-overdue") && (
        <p className={`deadline-cta deadline-cta--${level}`}>{OVERDUE_CTA[deadline.id]}</p>
      )}

      {(links.length > 0 || googleCalendarUrl) && (
        <div className="deadline-links">
          {links.map(
            (link) =>
              link && (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <LinkIcon width={16} height={16} />
                  {link.label}
                </a>
              )
          )}
          {googleCalendarUrl && (
            <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              <CalendarIcon width={16} height={16} />
              구글 캘린더에 추가
            </a>
          )}
        </div>
      )}

      {deadline.id === "certifiedDate" && (
        <CertifiedDateMethod method={certifiedDateMethod} onChange={onCertifiedDateMethodChange} />
      )}

      {deadline.legalBasis && (
        <p className="deadline-legal-basis">법적 근거: {deadline.legalBasis}</p>
      )}
    </div>
  );
}
