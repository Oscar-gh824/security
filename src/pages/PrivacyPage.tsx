import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const EFFECTIVE_DATE = "2026-08-27";

const OPERATOR_NAME = "보증금지키단 운영팀";
const CONTACT_EMAIL = "exper6202@naver.com";

export default function PrivacyPage() {
  return (
    <div className="page">
      <Header variant="sub" />
      <section className="section">
        <div className="card prose">
          <h1>개인정보처리방침</h1>
          <p className="sub-text">시행일자: {EFFECTIVE_DATE}</p>

          <h2>1. 운영자 정보</h2>
          <p>
            보증금지킴이(이하 "서비스")는 <strong>{OPERATOR_NAME}</strong>이(가) 운영합니다. 서비스 이용 중
            문의사항은 아래 연락처로 문의해주세요.
          </p>
          <p>
            연락처: <strong><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></strong>
          </p>

          <h2>2. 수집하는 정보와 저장 방식</h2>
          <p>
            서비스는 별도의 회원가입이나 로그인 없이 이용할 수 있습니다. 이사 정보(전입일, 계약 체결일,
            보증금·월세 등)와 체크리스트 진행 상태, 확정일자 처리 방법 선택값은 서버로 전송되지 않고
            <strong> 이용자의 브라우저 로컬 저장소(localStorage)에만</strong> 저장됩니다. 운영자를 포함한
            누구도 이 정보에 접근할 수 없으며, 브라우저 저장 데이터를 삭제하거나 다른 기기·브라우저로
            접속하면 정보가 유지되지 않습니다.
          </p>

          <h2>3. 광고 및 쿠키</h2>
          <p>
            서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 비롯한 제3자 광고
            공급업체는 쿠키를 사용하여 이용자가 이 사이트 또는 다른 사이트를 방문한 기록을 바탕으로
            맞춤 광고를 게재할 수 있습니다. 이용자는{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">
              Google 광고 설정
            </a>
            에서 맞춤 광고 게재를 위한 쿠키 사용을 언제든지 해제할 수 있습니다.
          </p>

          <h2>4. 외부 사이트 연결</h2>
          <p>
            서비스는 정부24, 인터넷등기소, 국토교통부 전월세신고 시스템 등 외부 공식 사이트로 연결되는
            링크를 제공합니다. 연결된 외부 사이트에서 발생하는 개인정보 처리에 대해서는 각 사이트의
            정책이 적용되며, 서비스는 이에 대한 책임을 지지 않습니다.
          </p>

          <h2>5. 개인정보처리방침의 변경</h2>
          <p>
            법령이나 서비스 정책 변경에 따라 본 방침의 내용이 변경될 수 있으며, 변경 시 이 페이지를 통해
            공지합니다.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
