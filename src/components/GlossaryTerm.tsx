import { useRef, useState } from "react";
import { glossary } from "../data/glossary";
import { QuestionIcon } from "./icons";

interface GlossaryTermProps {
  termId: string;
}

/** 툴팁이 화면 밖으로 나가지 않도록 좌우로 남겨두는 여백 (global.css의 width 계산과 맞춰야 함) */
const VIEWPORT_MARGIN = 12;
const TOOLTIP_MAX_WIDTH = 240;

/**
 * 툴팁은 트리거 기준 left:0에 붙기 때문에 화면 오른쪽 끝 용어에서는 넘칠 수 있다.
 * 열 때 트리거 위치를 재서 화면 안으로 들어오도록 왼쪽으로 밀어줄 거리를 계산한다.
 */
function calcOffsetX(trigger: HTMLElement): number {
  const triggerLeft = trigger.getBoundingClientRect().left;
  const tooltipWidth = Math.min(TOOLTIP_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  const overflowRight = triggerLeft + tooltipWidth - (window.innerWidth - VIEWPORT_MARGIN);
  if (overflowRight <= 0) return 0;

  // 왼쪽으로도 넘치지 않는 선까지만 민다
  const maxShift = Math.max(triggerLeft - VIEWPORT_MARGIN, 0);
  return -Math.min(overflowRight, maxShift);
}

/** 헷갈리는 용어 옆에 붙는 짧은 설명 툴팁 */
export function GlossaryTerm({ termId }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    setOpen((wasOpen) => {
      if (!wasOpen && triggerRef.current) {
        setOffsetX(calcOffsetX(triggerRef.current));
      }
      return !wasOpen;
    });
  }

  const entry = glossary.find((g) => g.id === termId);
  if (!entry) return null;

  return (
    <span className="glossary-term">
      <button
        ref={triggerRef}
        type="button"
        className="glossary-trigger"
        aria-expanded={open}
        aria-label={`${entry.term} 설명 보기`}
        onClick={toggle}
        onBlur={() => setOpen(false)}
      >
        {entry.term}
        <QuestionIcon width={14} height={14} />
      </button>
      {open && (
        <span
          className="glossary-tooltip"
          role="tooltip"
          style={{ transform: `translateX(${offsetX}px)` }}
        >
          {entry.description}
        </span>
      )}
    </span>
  );
}
