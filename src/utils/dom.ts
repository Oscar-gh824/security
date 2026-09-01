import type { FocusEvent } from "react";

/**
 * 숫자 입력 필드 포커스 시 기존 값을 전체 선택.
 * type="text" + inputMode="numeric" 조합의 필드에서만 동작함 — type="number"는
 * HTML 스펙상 select()가 적용되지 않아 이 방식이 통하지 않음.
 */
export function selectOnFocus(e: FocusEvent<HTMLInputElement>) {
  e.target.select();
}

/** 숫자가 아닌 문자를 제거하고 정수로 변환 (빈 문자열이면 0) */
export function parseDigits(raw: string): number {
  const digitsOnly = raw.replace(/[^0-9]/g, "");
  return digitsOnly === "" ? 0 : Number(digitsOnly);
}
