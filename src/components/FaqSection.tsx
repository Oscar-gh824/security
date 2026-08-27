import { useState } from "react";
import { faqItems } from "../data/faq";
import { ChevronDownIcon, QuestionIcon } from "./icons";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section" id="faq">
      <h2 className="section-title">
        <QuestionIcon />
        자주 묻는 질문
      </h2>

      <div className="card faq-card">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div className="faq-item" key={item.id}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  width={18}
                  height={18}
                  style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                />
              </button>
              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
