import { officialLinks } from "../data/links";
import { LinkIcon } from "./icons";

export function QuickLinks() {
  return (
    <section className="section">
      <h2 className="section-title">
        <LinkIcon />
        공식 사이트 바로가기
      </h2>
      <div className="card">
        <ul className="quick-links">
          {officialLinks.map((link) => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noreferrer" className="quick-link-item">
                <div>
                  <p className="quick-link-label">{link.label}</p>
                  <p className="sub-text">{link.description}</p>
                </div>
                <LinkIcon width={18} height={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
