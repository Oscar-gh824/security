import { useState } from "react";
import { glossary } from "../data/glossary";
import { QuestionIcon } from "./icons";

interface GlossaryTermProps {
  termId: string;
}

/** 헷갈리는 용어 옆에 붙는 짧은 설명 툴팁 */
export function GlossaryTerm({ termId }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const entry = glossary.find((g) => g.id === termId);
  if (!entry) return null;

  return (
    <span className="glossary-term">
      <button
        type="button"
        className="glossary-trigger"
        aria-expanded={open}
        aria-label={`${entry.term} 설명 보기`}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        {entry.term}
        <QuestionIcon width={14} height={14} />
      </button>
      {open && (
        <span className="glossary-tooltip" role="tooltip">
          {entry.description}
        </span>
      )}
    </span>
  );
}
