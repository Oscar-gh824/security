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
import type { MoveInInfo } from "./types";

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

  const deadlines = useMemo(() => calculateDeadlines(moveInInfo), [moveInInfo]);

  return (
    <div className="page">
      <Header />
      <MoveInForm value={moveInInfo} onChange={setMoveInInfo} />
      <DeadlineResults deadlines={deadlines} />
      <ChecklistSection />
      <QuickLinks />
      <PenaltyCalculator />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default App;
