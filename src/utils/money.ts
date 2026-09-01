/** 입력창에 표시할 천단위 쉼표 포맷 (만원 단위 숫자) */
export function formatManwonInput(manwon: number): string {
  return manwon.toLocaleString("ko-KR");
}

/** 만원 단위 숫자를 "n억 n,nnn만원" 형태의 한글 금액으로 변환 */
export function toKoreanAmount(manwon: number): string {
  if (manwon <= 0) return "0원";
  const eok = Math.floor(manwon / 10000);
  const remainder = manwon % 10000;
  if (eok === 0) return `${remainder.toLocaleString("ko-KR")}만원`;
  if (remainder === 0) return `${eok}억원`;
  return `${eok}억 ${remainder.toLocaleString("ko-KR")}만원`;
}
