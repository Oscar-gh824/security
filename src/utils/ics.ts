import type { DeadlineResult } from "../types";
import { addDays, formatToICSDate, parseDate } from "./date";

/** RFC 5545 TEXT 값 이스케이프: 백슬래시·세미콜론·쉼표·줄바꿈 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** RFC 5545 줄 폴딩: 한 줄이 75옥텟을 넘으면 접어서 이어붙임 (멀티바이트 문자 중간 절단 방지) */
function foldICSLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;

  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let start = 0;
  let limit = 75;

  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    // UTF-8 연속 바이트(10xxxxxx) 중간에서 자르지 않도록 뒤로 물러남
    while (end < bytes.length && end > start && (bytes[end] & 0xc0) === 0x80) {
      end--;
    }
    chunks.push(decoder.decode(bytes.slice(start, end)));
    start = end;
    limit = 74; // 다음 줄부터는 앞에 붙는 공백 1바이트를 포함해 75옥텟
  }

  return chunks.map((chunk, i) => (i === 0 ? chunk : ` ${chunk}`)).join("\r\n");
}

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
        `SUMMARY:${escapeICSText(`[보증금지킴이] ${d.title} 마감일`)}`,
        `DESCRIPTION:${escapeICSText(d.description)}`,
        "END:VEVENT",
      ]
        .map(foldICSLine)
        .join("\r\n");
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

/**
 * 구글 캘린더 "일정 만들기" 화면을 마감일 정보로 미리 채운 채 여는 링크.
 * 파일 다운로드·수동 가져오기 없이 클릭 한 번으로 등록 화면까지 이동함(저장은 사용자가 눌러야 함).
 */
export function buildGoogleCalendarUrl(deadline: DeadlineResult): string | null {
  if (!deadline.applicable || !deadline.dueDate) return null;
  const start = parseDate(deadline.dueDate);
  if (!start) return null;
  const end = addDays(start, 1);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `[보증금지킴이] ${deadline.title} 마감일`,
    dates: `${formatToICSDate(start)}/${formatToICSDate(end)}`,
    details: deadline.description,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
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
