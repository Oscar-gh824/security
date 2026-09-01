import { useMemo } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MoveInForm } from "./components/MoveInForm";
import { DeadlineResults } from "./components/DeadlineResults";
import { ChecklistSection } from "./components/ChecklistSection";
import { QuickLinks } from "./components/QuickLinks";
import { PenaltyCalculator } from "./components/PenaltyCalculator";
import { FaqSection } from "./components/FaqSection";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateDeadlines } from "./utils/deadlines";
import type { CertifiedDateMethod, MoveInInfo } from "./types";
import type { PenaltyProcedure } from "./utils/penalty";

// 화면이 비어 보이지 않도록 채워두는 더미 이사 정보
const DEFAULT_MOVE_IN_INFO: MoveInInfo = {
  moveInDate: "2026-08-16",
  contractDate: "2026-07-30",
  depositAmount: 8000,
  monthlyRent: 0,
  contractType: "new",
};

function App() {
  const [moveInInfo, setMoveInInfo] = useLocalStorage<MoveInInfo>(
    "boggl-guard-move-in-info",
    DEFAULT_MOVE_IN_INFO
  );
  const [certifiedDateMethod, setCertifiedDateMethod] = useLocalStorage<CertifiedDateMethod>(
    "boggl-guard-certified-date-method",
    "online"
  );

  const deadlines = useMemo(() => calculateDeadlines(moveInInfo), [moveInInfo]);

  // 이미 기한을 넘긴 신고가 있으면 과태료 계산기에 지연 일수를 미리 채워주기 위해 계산
  const overdueDays = useMemo(() => {
    const days: Partial<Record<PenaltyProcedure, number>> = {};
    for (const d of deadlines) {
      if ((d.id === "moveIn" || d.id === "rentReport") && d.applicable && d.dDay !== undefined && d.dDay < 0) {
        days[d.id] = -d.dDay;
      }
    }
    return days;
  }, [deadlines]);

  return (
    <div className="page">
      <Header />
      <MoveInForm value={moveInInfo} onChange={setMoveInInfo} />
      <DeadlineResults
        deadlines={deadlines}
        certifiedDateMethod={certifiedDateMethod}
        onCertifiedDateMethodChange={setCertifiedDateMethod}
      />
      <ChecklistSection
        certifiedDateMethod={certifiedDateMethod}
        onCertifiedDateMethodChange={setCertifiedDateMethod}
      />
      <QuickLinks />
      <PenaltyCalculator defaultDepositAmount={moveInInfo.depositAmount} overdueDays={overdueDays} />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default App;
