import React from "react";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

export function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h2 className={className}>{children}</h2>;
}

export function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function Button({
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
