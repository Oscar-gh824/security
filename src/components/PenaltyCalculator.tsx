import { useState } from "react";
import { estimatePenalty, formatWon, type PenaltyProcedure } from "../utils/penalty";
import { CalculatorIcon } from "./icons";

const PROCEDURE_LABEL: Record<PenaltyProcedure, string> = {
  moveIn: "전입신고",
  rentReport: "전월세 신고",
};

interface PenaltyCalculatorProps {
  /** 이사 정보 입력 폼의 보증금을 기본값으로 채워 입력 수고를 줄여줌 */
  defaultDepositAmount?: number;
}

export function PenaltyCalculator({ defaultDepositAmount }: PenaltyCalculatorProps) {
  const [procedure, setProcedure] = useState<PenaltyProcedure>("moveIn");
  const [daysLate, setDaysLate] = useState(0);
  const [depositAmount, setDepositAmount] = useState(defaultDepositAmount ?? 0);

  const estimate = estimatePenalty(
    procedure,
    daysLate,
    procedure === "rentReport" ? depositAmount : undefined
  );

  const isNone = estimate.minWon === 0 && estimate.maxWon === 0;
  const displayAmount = isNone
    ? "과태료 없음"
    : estimate.pointWon !== undefined
      ? `약 ${formatWon(estimate.pointWon)}`
      : estimate.minWon === estimate.maxWon
        ? formatWon(estimate.minWon)
        : `${formatWon(estimate.minWon)} ~ ${formatWon(estimate.maxWon)}`;

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

        {procedure === "rentReport" && (
          <div className="field">
            <label htmlFor="penaltyDepositAmount">계약금액 (보증금, 만원)</label>
            <input
              id="penaltyDepositAmount"
              type="number"
              min={0}
              inputMode="numeric"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Math.max(0, Number(e.target.value)))}
            />
          </div>
        )}

        <div className="penalty-result">
          <p className="penalty-amount">{displayAmount}</p>
          <p className="sub-text">{estimate.note}</p>
          {procedure === "rentReport" && estimate.pointWon === undefined && !isNone && (
            <p className="sub-text">계약금액을 입력하면 더 구체적인 예상 금액을 볼 수 있어요.</p>
          )}
          <p className="sub-text">
            * 실제 지자체 조례·개별 사정에 따라 달라질 수 있는 참고용 추정치예요.
          </p>
        </div>
      </div>
    </section>
  );
}
