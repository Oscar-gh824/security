// 둥근 라인 스타일 아이콘 모음 (stroke 기반, stroke-linecap/linejoin: round)
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4M16 3v4" />
    </Base>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 6h10M9 12h10M9 18h10" />
      <path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
    </Base>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 5h3.5A3.5 3.5 0 0 1 21 8.5v0A3.5 3.5 0 0 1 17.5 12H14" />
      <path d="M10 19H6.5A3.5 3.5 0 0 1 3 15.5v0A3.5 3.5 0 0 1 6.5 12H10" />
      <path d="M8.5 12h7" />
    </Base>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="2.2" />
      <path d="M8 7.5h8" />
      <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </Base>
  );
}

export function QuestionIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.9" />
      <path d="M12 17.2h.01" />
    </Base>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.6h.01" />
    </Base>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 19.5h14" />
    </Base>
  );
}
