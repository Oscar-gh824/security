const LAST_UPDATED = "2026-08-27";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        본 서비스의 신고 기한·과태료 정보는 주민등록법, 부동산 거래신고 등에 관한 법률(전월세 신고제) 등을
        바탕으로 한 참고용 안내이며, 법적 효력이 없어요. 실제 적용 여부와 정확한 금액은 정부24, 국토교통부,
        관할 주민센터 등 공식 기관을 통해 반드시 다시 확인해주세요.
      </p>
      <p style={{ marginTop: 6 }}>정보 기준일: {LAST_UPDATED}</p>
    </footer>
  );
}
