"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Moon, Sun, BedDouble, Info } from "lucide-react";

const SHIFT_SEQUENCE = ["白班", "夜班", "休息", "休息"] as const;
type Shift = (typeof SHIFT_SEQUENCE)[number];

function getShiftByDiff(diffDays: number): Shift {
  const index = ((diffDays % 4) + 4) % 4;
  return SHIFT_SEQUENCE[index];
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function diffDays(from: Date, to: Date) {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.round(ms / 86400000);
}

function buildMonthGrid(viewDate: Date) {
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

function shiftMeta(shift: Shift) {
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

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h2 className={className}>{children}</h2>;
}

function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function Button({
  className = "",
  variant = "default",
  onClick,
  children,
}: {
  className?: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition";
  const style =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  );
}

function Input({
  className = "",
  value,
  onChange,
  type = "text",
}: {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 ${className}`}
    />
  );
}

export default function Page() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [anchorDate, setAnchorDate] = useState("2026-03-25");
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()));

  const todayShift = useMemo(() => {
    if (!anchorDate) return "休息" as Shift;
    return getShiftByDiff(diffDays(parseLocalDate(anchorDate), today));
  }, [anchorDate, today]);

  const monthDays = useMemo(() => buildMonthGrid(viewDate), [viewDate]);
  const currentMonth = viewDate.getMonth();
  const monthLabel = `${viewDate.getFullYear()}年${viewDate.getMonth() + 1}月`;

  const todayMeta = shiftMeta(todayShift);
  const TodayIcon = todayMeta.icon;

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[360px_1fr]"
        >
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <CalendarIcon className="h-5 w-5" />
                白夜班计算器
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  基准日期（这一天按白班算）
                </label>
                <Input
                  type="date"
                  value={anchorDate}
                  onChange={(e) => setAnchorDate(e.target.value)}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-sm text-slate-500">当前循环规则</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SHIFT_SEQUENCE.map((item, index) => {
                    const meta = shiftMeta(item);
                    return (
                      <span
                        key={`${item}-${index}`}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${meta.badge}`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>

              <motion.div layout className={`rounded-3xl border p-5 ${todayMeta.badge}`}>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/70 p-3">
                    <TodayIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">今天状态</div>
                    <div className="text-2xl font-bold">{todayShift}</div>
                    <div className="mt-1 text-sm opacity-80">今天：{formatDate(today)}</div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader className="px-3 pt-4 pb-0 sm:p-6 sm:pb-0">
              <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-lg sm:text-xl font-semibold">{monthLabel}</CardTitle>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
                    }
                  >
                    上个月
                  </Button>
                  <Button variant="outline" onClick={() => setViewDate(startOfDay(new Date()))}>
                    回到本月
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
                    }
                  >
                    下个月
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-1.5 py-3 sm:p-6">
              <div className="grid grid-cols-7 text-center text-[11px] sm:text-sm font-medium text-slate-500">
                {["日", "一", "二", "三", "四", "五", "六"].map((w) => (
                  <div key={w} className="py-1 sm:py-2">
                    {w}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px sm:gap-2">
                {monthDays.map((date) => {
                  const dateStr = formatDate(date);
                  const isCurrentMonth = date.getMonth() === currentMonth;
                  const isToday = dateStr === formatDate(today);
                  const shift = anchorDate
                    ? getShiftByDiff(diffDays(parseLocalDate(anchorDate), date))
                    : "休息";
                  const meta = shiftMeta(shift);
                  const Icon = meta.icon;

                  return (
                    <motion.div
                      key={dateStr}
                      whileHover={{ y: -2 }}
                      className={[
                        "aspect-square sm:aspect-auto sm:min-h-[108px] rounded-lg sm:rounded-2xl border p-1 sm:p-3 text-left transition overflow-hidden flex flex-col",
                        isCurrentMonth
                          ? "border-slate-200 bg-white"
                          : "border-slate-100 bg-slate-50 text-slate-400",
                        isToday ? "ring-2 ring-slate-300" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-[11px] sm:text-sm font-semibold leading-none">{date.getDate()}</div>
                        {isToday && (
                          <span className="rounded-full bg-slate-900 px-1 py-px text-[8px] sm:px-2 sm:py-0.5 sm:text-xs text-white leading-tight">
                            今天
                          </span>
                        )}
                      </div>

                      <div className="mt-auto sm:mt-4 flex justify-center sm:justify-start">
                        <span
                          className={`inline-flex items-center gap-0.5 sm:gap-2 rounded-full border px-1 sm:px-2.5 py-px sm:py-1 text-[9px] sm:text-xs whitespace-nowrap ${meta.badge}`}
                        >
                          <Icon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 shrink-0" />
                          {shift}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <div className="text-base font-semibold text-slate-900">默认示例</div>
              <div className="text-sm text-slate-500">
                例如：2026-03-25 设为白班，则 2026-04-13 会自动显示为休息。
              </div>
            </div>
            <Button className="w-full md:w-auto shrink-0" onClick={() => setAnchorDate("2026-03-25")}>恢复示例日期</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
