"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { startOfDay, diffDays, parseLocalDate, getShiftByDiff, type Shift } from "./lib/shift";
import { Card, CardContent, Button } from "./components/ui";
import { SidePanel } from "./components/SidePanel";
import { ShiftCalendar } from "./components/ShiftCalendar";

export default function Page() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [anchorDate, setAnchorDate] = useState("2026-03-25");
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()));

  const todayShift = useMemo(() => {
    if (!anchorDate) return "休息" as Shift;
    return getShiftByDiff(diffDays(parseLocalDate(anchorDate), today));
  }, [anchorDate, today]);

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[360px_1fr]"
        >
          <SidePanel
            anchorDate={anchorDate}
            setAnchorDate={setAnchorDate}
            todayShift={todayShift}
            today={today}
          />
          <ShiftCalendar
            anchorDate={anchorDate}
            today={today}
            viewDate={viewDate}
            setViewDate={setViewDate}
          />
        </motion.div>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <div className="text-base font-semibold text-slate-900">默认示例</div>
              <div className="text-sm text-slate-500">
                例如：2026-03-25 设为白班，则 2026-04-13 会自动显示为休息。
              </div>
            </div>
            <Button
              className="w-full md:w-auto shrink-0"
              onClick={() => setAnchorDate("2026-03-25")}
            >
              恢复示例日期
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
