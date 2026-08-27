import { HomeIcon } from "./icons";

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-badge">
          <HomeIcon width={20} height={20} />
        </span>
        <div>
          <h1 className="header-title">보증금지킴이</h1>
          <p className="header-subtitle">이사 후 놓치기 쉬운 신고 마감일, 한 번에 챙기세요</p>
        </div>
      </div>
    </header>
  );
}
