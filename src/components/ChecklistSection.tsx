import { checklistGroups } from "../data/checklist";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ChecklistIcon } from "./icons";

export function ChecklistSection() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    "boggl-guard-checklist",
    {}
  );

  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;

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

      {checklistGroups.map((group) => (
        <div className="card checklist-group" key={group.id}>
          <h3 className="checklist-group-title">{group.title}</h3>
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
