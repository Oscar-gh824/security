import { HomeIcon } from "./icons";

interface HeaderProps {
  /** "home"이면 제목이 페이지의 h1, "sub"이면 로고 역할로 홈 링크가 됨 (페이지별 h1 중복 방지) */
  variant?: "home" | "sub";
}

export function Header({ variant = "home" }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-badge">
          <HomeIcon width={20} height={20} />
        </span>
        <div style={{ flex: 1 }}>
          {variant === "home" ? (
            <h1 className="header-title">보증금지킴이</h1>
          ) : (
            <p className="header-title">
              <a href="/">보증금지킴이</a>
            </p>
          )}
          <p className="header-subtitle">이사 후 놓치기 쉬운 신고 마감일, 한 번에 챙기세요</p>
        </div>
        {variant === "home" && (
          <a href="/guide/" className="header-guide-link">
            사용법 보기
          </a>
        )}
      </div>
    </header>
  );
}
