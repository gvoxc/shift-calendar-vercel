"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  buildMonthGrid,
  formatDate,
  getShiftByDiff,
  diffDays,
  parseLocalDate,
  shiftMeta,
  startOfDay,
} from "../lib/shift";
import { Card, CardHeader, CardTitle, CardContent, Button } from "./ui";

export function ShiftCalendar({
  anchorDate,
  today,
  viewDate,
  setViewDate,
}: {
  anchorDate: string;
  today: Date;
  viewDate: Date;
  setViewDate: (d: Date) => void;
}) {
  const monthDays = useMemo(() => buildMonthGrid(viewDate), [viewDate]);
  const currentMonth = viewDate.getMonth();
  const monthLabel = `${viewDate.getFullYear()}年${viewDate.getMonth() + 1}月`;

  return (
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
                  <div className="text-[11px] sm:text-sm font-semibold leading-none">
                    {date.getDate()}
                  </div>
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
  );
}
