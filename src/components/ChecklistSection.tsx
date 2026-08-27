import { checklistGroups } from "../data/checklist";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CertifiedDateMethod } from "../types";
import { CertifiedDateMethodToggle } from "./CertifiedDateMethodToggle";
import { ChecklistIcon } from "./icons";

interface ChecklistSectionProps {
  certifiedDateMethod: CertifiedDateMethod;
  onCertifiedDateMethodChange: (method: CertifiedDateMethod) => void;
}

export function ChecklistSection({
  certifiedDateMethod,
  onCertifiedDateMethodChange,
}: ChecklistSectionProps) {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    "boggl-guard-checklist",
    {}
  );

  const visibleGroups = checklistGroups.map((group) =>
    group.id === "certifiedDate"
      ? {
          ...group,
          items: group.items.filter(
            (item) => !item.methods || item.methods.includes(certifiedDateMethod)
          ),
        }
      : group
  );

  const totalItems = visibleGroups.reduce((sum, g) => sum + g.items.length, 0);
  const doneItems = visibleGroups.reduce(
    (sum, g) => sum + g.items.filter((item) => checked[item.id]).length,
    0
  );

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="section">
      <h2 className="section-title">
        <ChecklistIcon />
        필요서류 체크리스트
        <span className="sub-text" style={{ marginLeft: "auto", fontWeight: 400 }}>
          {doneItems}/{totalItems}
        </span>
      </h2>

      {visibleGroups.map((group) => (
        <div className="card checklist-group" key={group.id}>
          <h3 className="checklist-group-title">{group.title}</h3>

          {group.id === "certifiedDate" && (
            <div style={{ marginBottom: 12 }}>
              <CertifiedDateMethodToggle
                method={certifiedDateMethod}
                onChange={onCertifiedDateMethodChange}
              />
            </div>
          )}

          <ul className="checklist-items">
            {group.items.map((item) => (
              <li key={item.id}>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                  />
                  <span>
                    <span className="checklist-item-label">{item.label}</span>
                    {item.detail && <span className="sub-text"> · {item.detail}</span>}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
