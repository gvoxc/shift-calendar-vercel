"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { SHIFT_SEQUENCE, shiftMeta, formatDate, type Shift } from "../lib/shift";
import { Card, CardHeader, CardTitle, CardContent } from "./ui";
import { DatePicker } from "./DatePicker";

export function SidePanel({
  anchorDate,
  setAnchorDate,
  todayShift,
  today,
}: {
  anchorDate: string;
  setAnchorDate: (v: string) => void;
  todayShift: Shift;
  today: Date;
}) {
  const todayMeta = shiftMeta(todayShift);
  const TodayIcon = todayMeta.icon;

  return (
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
          <DatePicker value={anchorDate} onChange={setAnchorDate} />
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
  );
}
