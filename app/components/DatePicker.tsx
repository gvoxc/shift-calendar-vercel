"use client";

import React, { useRef, useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";
import { CalendarIcon } from "lucide-react";
import { formatDate, parseLocalDate } from "../lib/shift";

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (dateStr: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? parseLocalDate(value) : undefined;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-slate-400"
      >
        <span>{value ? value.replace(/-/g, "/") : "选择日期"}</span>
        <CalendarIcon className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
          <DayPicker
            mode="single"
            locale={zhCN}
            selected={selected}
            defaultMonth={selected}
            onSelect={(date) => {
              if (date) {
                onChange(formatDate(date));
                setOpen(false);
              }
            }}
            classNames={{
              root: "text-sm",
              months: "flex flex-col",
              month_caption: "flex justify-center items-center h-10 font-semibold text-slate-900",
              nav: "flex items-center justify-between absolute inset-x-0 top-0 h-10 px-1",
              button_previous: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-600",
              button_next: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-600",
              weekdays: "grid grid-cols-7 text-center text-xs font-medium text-slate-500",
              weekday: "py-1.5",
              weeks: "mt-1",
              week: "grid grid-cols-7",
              day: "text-center",
              day_button: "inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm transition hover:bg-slate-100",
              selected: "!bg-slate-900 !text-white hover:!bg-slate-800 rounded-xl",
              today: "font-bold text-blue-600",
              outside: "text-slate-300",
            }}
          />
        </div>
      )}
    </div>
  );
}
