import type { DeadlineResult } from "../types";
import { downloadICS } from "../utils/ics";
import { CalendarIcon, DownloadIcon } from "./icons";
import { DeadlineCard } from "./DeadlineCard";

interface DeadlineResultsProps {
  deadlines: DeadlineResult[];
}

export function DeadlineResults({ deadlines }: DeadlineResultsProps) {
  if (deadlines.length === 0) return null;

  const hasApplicable = deadlines.some((d) => d.applicable && d.dueDate);

  return (
    <section className="section">
      <h2 className="section-title">
        <CalendarIcon />
        자동 판정 결과
      </h2>

      <div className="deadline-list">
        {deadlines.map((d) => (
          <DeadlineCard key={d.id} deadline={d} />
        ))}
      </div>

      {hasApplicable && (
        <button
          type="button"
          className="btn btn-secondary btn-block"
          style={{ marginTop: 14 }}
          onClick={() => downloadICS(deadlines)}
        >
          <DownloadIcon width={18} height={18} />
          구글 캘린더에 마감일 추가 (.ics 내보내기)
        </button>
      )}
    </section>
  );
}
