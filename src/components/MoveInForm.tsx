import type { ContractType, MoveInInfo } from "../types";
import { parseDigits, selectOnFocus } from "../utils/dom";
import { HomeIcon } from "./icons";

interface MoveInFormProps {
  value: MoveInInfo;
  onChange: (next: MoveInInfo) => void;
}

export function MoveInForm({ value, onChange }: MoveInFormProps) {
  function update<K extends keyof MoveInInfo>(key: K, next: MoveInInfo[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <section className="section">
      <div className="card">
        <h2 className="section-title">
          <HomeIcon />
          이사 정보 입력
        </h2>

        <div className="field">
          <label htmlFor="moveInDate">전입일</label>
          <input
            id="moveInDate"
            type="date"
            value={value.moveInDate}
            onChange={(e) => update("moveInDate", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="contractDate">계약 체결일</label>
          <input
            id="contractDate"
            type="date"
            value={value.contractDate}
            onChange={(e) => update("contractDate", e.target.value)}
          />
        </div>

        <div className="grid-2">
          <div className="field">
            <label htmlFor="depositAmount">보증금 (만원)</label>
            <input
              id="depositAmount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value.depositAmount}
              onFocus={selectOnFocus}
              onChange={(e) => update("depositAmount", parseDigits(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="monthlyRent">월세 (만원)</label>
            <input
              id="monthlyRent"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value.monthlyRent}
              onFocus={selectOnFocus}
              onChange={(e) => update("monthlyRent", parseDigits(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label>계약 구분</label>
          <div className="segmented" role="tablist" aria-label="계약 구분">
            {(["new", "renewal"] as ContractType[]).map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={value.contractType === type}
                className={value.contractType === type ? "active" : ""}
                onClick={() => update("contractType", type)}
              >
                {type === "new" ? "신규 계약" : "갱신 계약"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
