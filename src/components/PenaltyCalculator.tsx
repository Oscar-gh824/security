import { useState } from "react";
import { estimatePenalty, formatWon, type PenaltyProcedure } from "../utils/penalty";
import { CalculatorIcon } from "./icons";

const PROCEDURE_LABEL: Record<PenaltyProcedure, string> = {
  moveIn: "전입신고",
  rentReport: "전월세 신고",
};

export function PenaltyCalculator() {
  const [procedure, setProcedure] = useState<PenaltyProcedure>("moveIn");
  const [daysLate, setDaysLate] = useState(0);

  const estimate = estimatePenalty(procedure, daysLate);

  return (
    <section className="section">
      <h2 className="section-title">
        <CalculatorIcon />
        놓쳤을 때 과태료 계산기
      </h2>

      <div className="card">
        <div className="field">
          <label>어떤 신고를 놓쳤나요?</label>
          <div className="segmented">
            {(Object.keys(PROCEDURE_LABEL) as PenaltyProcedure[]).map((key) => (
              <button
                key={key}
                type="button"
                className={procedure === key ? "active" : ""}
                onClick={() => setProcedure(key)}
              >
                {PROCEDURE_LABEL[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="daysLate">기한에서 며칠 지났나요?</label>
          <input
            id="daysLate"
            type="number"
            min={0}
            inputMode="numeric"
            value={daysLate}
            onChange={(e) => setDaysLate(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="penalty-result">
          <p className="penalty-amount">
            {estimate.minWon === 0 && estimate.maxWon === 0
              ? "과태료 없음"
              : estimate.minWon === estimate.maxWon
                ? formatWon(estimate.minWon)
                : `${formatWon(estimate.minWon)} ~ ${formatWon(estimate.maxWon)}`}
          </p>
          <p className="sub-text">{estimate.note}</p>
          <p className="sub-text">
            * 실제 지자체 조례·개별 사정에 따라 달라질 수 있는 참고용 추정치예요.
          </p>
        </div>
      </div>
    </section>
  );
}
