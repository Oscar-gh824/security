import type { DeadlineResult } from "../types";
import { formatDateKorean, parseDate } from "../utils/date";
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

interface DeadlineCardProps {
  deadline: DeadlineResult;
}

export function DeadlineCard({ deadline }: DeadlineCardProps) {
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

  const level = getUrgencyLevel(deadline.dDay);
  const dueDate = deadline.dueDate ? parseDate(deadline.dueDate) : null;
  const links = (LINK_MAP[deadline.id] ?? [])
    .map((id) => officialLinks.find((l) => l.id === id))
    .filter(Boolean);

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

      {links.length > 0 && (
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
        </div>
      )}

      {deadline.id === "certifiedDate" && <CertifiedDateMethod />}

      {deadline.legalBasis && (
        <p className="deadline-legal-basis">법적 근거: {deadline.legalBasis}</p>
      )}
    </div>
  );
}
