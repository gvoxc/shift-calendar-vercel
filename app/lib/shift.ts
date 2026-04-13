import { Sun, Moon, BedDouble } from "lucide-react";

export const SHIFT_SEQUENCE = ["白班", "夜班", "休息", "休息"] as const;
export type Shift = (typeof SHIFT_SEQUENCE)[number];

export function getShiftByDiff(diffDays: number): Shift {
  const index = ((diffDays % 4) + 4) % 4;
  return SHIFT_SEQUENCE[index];
}

export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function diffDays(from: Date, to: Date) {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.round(ms / 86400000);
}

export function buildMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

export function shiftMeta(shift: Shift) {
  switch (shift) {
    case "白班":
      return {
        icon: Sun,
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    case "夜班":
      return {
        icon: Moon,
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      };
    default:
      return {
        icon: BedDouble,
        badge: "bg-slate-100 text-slate-700 border-slate-200",
        dot: "bg-slate-400",
      };
  }
}
