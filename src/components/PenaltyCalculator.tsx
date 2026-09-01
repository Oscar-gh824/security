import { useState } from "react";
import { estimatePenalty, formatWon, type PenaltyProcedure } from "../utils/penalty";
import { parseDigits, selectOnFocus } from "../utils/dom";
import { formatManwonInput, toKoreanAmount } from "../utils/money";
import { CalculatorIcon } from "./icons";

const PROCEDURE_LABEL: Record<PenaltyProcedure, string> = {
  moveIn: "전입신고",
  rentReport: "전월세 신고",
};

interface PenaltyCalculatorProps {
  /** 이사 정보 입력 폼의 보증금을 기본값으로 채워 입력 수고를 줄여줌 */
  defaultDepositAmount?: number;
  /** 자동 판정 결과에서 이미 기한을 넘긴 신고가 있으면, 지연 일수를 미리 채워주기 위한 값 */
  overdueDays?: Partial<Record<PenaltyProcedure, number>>;
}

function findOverdueEntry(overdueDays?: Partial<Record<PenaltyProcedure, number>>) {
  return (Object.keys(PROCEDURE_LABEL) as PenaltyProcedure[])
    .map((key) => [key, overdueDays?.[key]] as const)
    .find((entry): entry is [PenaltyProcedure, number] => (entry[1] ?? 0) > 0);
}

export function PenaltyCalculator({ defaultDepositAmount, overdueDays }: PenaltyCalculatorProps) {
  const initialOverdue = findOverdueEntry(overdueDays);

  const [procedure, setProcedure] = useState<PenaltyProcedure>(initialOverdue?.[0] ?? "moveIn");
  const [daysLate, setDaysLate] = useState(initialOverdue?.[1] ?? 0);
  const [depositAmount, setDepositAmount] = useState(defaultDepositAmount ?? 0);
  const [showAutoFillNote, setShowAutoFillNote] = useState(initialOverdue !== undefined);

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
                onClick={() => {
                  setShowAutoFillNote(false);
                  setProcedure(key);
                }}
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={daysLate}
            onFocus={selectOnFocus}
            onChange={(e) => {
              setShowAutoFillNote(false);
              setDaysLate(parseDigits(e.target.value));
            }}
          />
          {showAutoFillNote && (
            <p className="sub-text" style={{ marginTop: 4 }}>
              위 자동 판정 결과의 지연 일수를 가져왔어요. 직접 다른 값을 넣어도 돼요.
            </p>
          )}
        </div>

        {procedure === "rentReport" && (
          <div className="field">
            <label htmlFor="penaltyDepositAmount">계약금액 (보증금, 만원)</label>
            <input
              id="penaltyDepositAmount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formatManwonInput(depositAmount)}
              onFocus={selectOnFocus}
              onChange={(e) => setDepositAmount(parseDigits(e.target.value))}
            />
            <p className="sub-text field-amount-hint">{toKoreanAmount(depositAmount)}</p>
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
