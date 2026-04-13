import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "白夜班计算器",
  description: "根据白班基准日自动计算今天和值班日历状态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
