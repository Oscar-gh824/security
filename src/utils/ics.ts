import type { DeadlineResult } from "../types";
import { addDays, formatToICSDate, parseDate } from "./date";

/** 마감일 목록을 하나의 .ics 파일 내용으로 변환 */
export function buildICS(deadlines: DeadlineResult[]): string {
  const events = deadlines
    .filter((d) => d.applicable && d.dueDate)
    .map((d) => {
      const start = parseDate(d.dueDate as string);
      if (!start) return "";
      const end = addDays(start, 1);
      const uid = `${d.id}-${d.dueDate}@boggl-guard`;
      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTART;VALUE=DATE:${formatToICSDate(start)}`,
        `DTEND;VALUE=DATE:${formatToICSDate(end)}`,
        `SUMMARY:[보증금지킴이] ${d.title} 마감일`,
        `DESCRIPTION:${d.description.replace(/\n/g, "\\n")}`,
        "END:VEVENT",
      ].join("\r\n");
    })
    .filter(Boolean);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//boggl-guard//KR",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(deadlines: DeadlineResult[], filename = "boggl-guard-deadlines.ics") {
  const content = buildICS(deadlines);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
