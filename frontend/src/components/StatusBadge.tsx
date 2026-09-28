import React from "react";
import { TicketStatus, Priority } from "@/data/tickets";
import { AlertCircle, CheckCircle2, Clock, Flame, ShieldAlert, Sparkles } from "lucide-react";

const statusConfig: Record<
  TicketStatus,
  { label: string; bg: string; text: string; border: string; dot: string; pulse?: boolean }
> = {
  open: {
    label: "Open",
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-300 dark:border-sky-700/50",
    dot: "bg-sky-500",
    pulse: true,
  },
  assigned: {
    label: "Assigned",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-300 dark:border-indigo-700/50",
    dot: "bg-indigo-500",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700/50",
    dot: "bg-amber-500",
    pulse: true,
  },
  escalated: {
    label: "Escalated",
    bg: "bg-rose-500/15 dark:bg-rose-500/20",
    text: "text-rose-700 dark:text-rose-300 font-bold",
    border: "border-rose-400 dark:border-rose-600/60",
    dot: "bg-rose-500",
    pulse: true,
  },
  resolved: {
    label: "Resolved",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-700/50",
    dot: "bg-emerald-500",
  },
  closed: {
    label: "Closed",
    bg: "bg-slate-500/10 dark:bg-slate-500/15",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-300 dark:border-slate-700/50",
    dot: "bg-slate-400",
  },
};

const priorityConfig: Record<
  Priority,
  { label: string; badge: string; icon: React.ReactNode }
> = {
  low: {
    label: "Low Priority",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    icon: <Clock className="h-3 w-3 mr-1 opacity-70" />,
  },
  medium: {
    label: "Medium",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
    icon: <Sparkles className="h-3 w-3 mr-1 text-blue-500" />,
  },
  high: {
    label: "High Priority",
    badge: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800/60",
    icon: <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />,
  },
  emergency: {
    label: "🚨 Emergency",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-700/70 animate-pulse font-bold shadow-sm shadow-rose-500/10",
    icon: <Flame className="h-3 w-3 mr-1 text-rose-500 fill-rose-500" />,
  },
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = statusConfig[status] || statusConfig.open;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm transition-all ${config.bg} ${config.text} ${config.border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot} ${
          config.pulse ? "animate-ping opacity-75" : ""
        }`}
      />
      <span>{config.label}</span>
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority] || priorityConfig.medium;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badge}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
