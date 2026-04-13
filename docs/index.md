# 技术栈

这个压缩包里已经包含最小可用项目：

- Next.js
- React
- Tailwind
- framer-motion
- lucide-react
- react-day-picker

## 组件拆分

| 文件 | 职责 |
|------|------|
| `app/lib/shift.ts` | 公共逻辑：班次计算、日期工具函数、shiftMeta |
| `app/components/ui.tsx` | 基础 UI 组件：Card、CardHeader、CardTitle、CardContent、Button |
| `app/components/DatePicker.tsx` | 日期选择器，基于 react-day-picker，中文 locale，点击外部关闭 |
| `app/components/SidePanel.tsx` | 左侧面板：标题、基准日期选择、循环规则、今天状态 |
| `app/components/ShiftCalendar.tsx` | 右侧日历主体：月份导航、7×6 班次网格 |
| `app/page.tsx` | 页面入口：状态管理 + 组装各组件 |