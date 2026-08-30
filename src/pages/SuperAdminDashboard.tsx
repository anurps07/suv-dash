import React, { useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  AlertTriangle,
  BarChart3,
  Users,
  Flame,
  CheckCircle2,
  Clock,
  Zap,
  Droplets,
  Trash2,
  Search,
  Download,
  Sparkles,
  Lock,
  Cpu,
  Activity
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import AppHeader from "@/components/AppHeader";
import { toast } from "sonner";
import type { TicketStatus, Department } from "@/data/tickets";

const pieColors = ["#f59e0b", "#f43f5e", "#0ea5e9", "#10b981"];

export default function SuperAdminDashboard() {
  const { tickets, updateTicketStatus } = useTickets();
  const [searchQuery, setSearchQuery] = useState("");

  const escalated = tickets.filter((t) => t.status === "escalated");
  const emergency = tickets.filter((t) => t.priority === "emergency");
  const resolvedCount = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length;
  const resolutionRate = tickets.length > 0 ? Math.round((resolvedCount / tickets.length) * 100) : 100;

  const handleStatusChange = (ticketId: string, status: string) => {
    updateTicketStatus(ticketId, status as TicketStatus);
    toast.success(`Super Admin override: Ticket ${ticketId} set to ${status.toUpperCase()}`);
  };

  const deptData = [
    { name: "Electricity", value: tickets.filter((t) => t.department === "Electricity").length },
    { name: "Gas", value: tickets.filter((t) => t.department === "Gas").length },
    { name: "Water Supply", value: tickets.filter((t) => t.department === "Water Supply").length },
    { name: "Waste Mgmt", value: tickets.filter((t) => t.department === "Waste Management").length },
  ];

  const filteredTickets = tickets.filter((t) =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-7xl px-4 sm:px-8 space-y-8">
        
        {/* Executive Command Hero */}
        <div className="p-6 sm:p-10 rounded-3xl gradient-hero text-white border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
                <Cpu className="h-3.5 w-3.5" />
                <span>Executive Command & Oversight Console</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Super Admin Control Center
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Full-tier supervisory governance, critical incident escalations, city-wide municipal performance, and override protocols.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Municipal Health Index</div>
                <div className="font-display text-2xl font-bold text-emerald-400">{resolutionRate}% Optimal</div>
                <div className="text-[11px] text-slate-300">All 4 department nodes live</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Executive Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "City-Wide Grievances", value: tickets.length, icon: <BarChart3 className="h-5 w-5 text-sky-500" />, color: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400", sub: "Total registered in system" },
            { label: "Active Escalations", value: escalated.length, icon: <AlertTriangle className="h-5 w-5 text-rose-500" />, color: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400", sub: "Priority intervention required" },
            { label: "Emergency Hazards", value: emergency.length, icon: <Flame className="h-5 w-5 text-amber-500" />, color: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400", sub: "Immediate SLA priority" },
            { label: "Overall Resolution Rate", value: `${resolutionRate}%`, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400", sub: "Resolved vs total workload" },
          ].map((stat) => (
            <Card key={stat.label} className="border border-border/80 shadow-sm rounded-2xl overflow-hidden bg-card">
              <CardContent className="p-5 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium block">{stat.label}</span>
                  <div className="font-display text-3xl font-bold tracking-tight text-foreground">{stat.value}</div>
                  <span className="text-[11px] text-muted-foreground">{stat.sub}</span>
                </div>
                <div className={`p-3 rounded-xl border ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Escalated Incidents & Department Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Escalation Center (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border border-rose-500/30 shadow-lg rounded-3xl overflow-hidden bg-card">
              <CardHeader className="p-5 sm:p-6 pb-3 border-b border-border/60 bg-rose-500/5">
                <CardTitle className="font-display text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  High-Priority Escalation Command Triage
                </CardTitle>
                <CardDescription className="text-xs">
                  Tickets flagged by citizens or department admins for supervisor intervention
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 space-y-3">
                {escalated.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground space-y-2">
                    <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-500/50" />
                    <p className="font-semibold text-sm">No Active Escalations</p>
                    <p className="text-xs">All departmental complaints are operating within approved SLA limits.</p>
                  </div>
                ) : (
                  escalated.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 rounded-2xl border border-rose-400/40 bg-rose-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-300">
                            {ticket.id}
                          </span>
                          <PriorityBadge priority={ticket.priority} />
                          <span className="text-xs font-semibold text-foreground/90">{ticket.department}</span>
                        </div>
                        <p className="font-semibold text-sm text-foreground">{ticket.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Citizen: {ticket.citizenName} · Officer: {ticket.assignedOfficer || "Unassigned"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Select onValueChange={(v) => handleStatusChange(ticket.id, v)}>
                          <SelectTrigger className="h-8 w-36 text-xs rounded-xl border-rose-300 dark:border-rose-700">
                            <SelectValue placeholder="Override Action" />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectItem value="in-progress">De-escalate</SelectItem>
                            <SelectItem value="resolved">Force Resolve</SelectItem>
                            <SelectItem value="assigned">Reassign Dispatch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Department Distribution Pie Chart */}
          <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden bg-card">
            <CardHeader className="p-5 sm:p-6 pb-2">
              <CardTitle className="font-display text-base font-bold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                Department Load Share
              </CardTitle>
              <CardDescription className="text-xs">
                Proportion of municipal workload
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-0">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {deptData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Master Citywide Audit Table */}
        <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden bg-card">
          <CardHeader className="p-5 sm:p-6 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl font-bold">System-Wide Audit Log</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Full ledger of all civic complaints, timestamps & assigned personnel
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Search master logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs rounded-xl bg-background"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground font-semibold text-left">
                    <th className="p-3.5 pl-6">Token</th>
                    <th className="p-3.5">Citizen</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Issue Summary</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Officer</th>
                    <th className="p-3.5 pr-6 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5 pl-6 font-mono font-bold text-primary">{ticket.id}</td>
                      <td className="p-3.5 font-medium">{ticket.citizenName}</td>
                      <td className="p-3.5 font-medium">{ticket.department}</td>
                      <td className="p-3.5 max-w-xs truncate text-foreground">{ticket.description}</td>
                      <td className="p-3.5"><PriorityBadge priority={ticket.priority} /></td>
                      <td className="p-3.5"><StatusBadge status={ticket.status} /></td>
                      <td className="p-3.5 text-muted-foreground">{ticket.assignedOfficer || "—"}</td>
                      <td className="p-3.5 pr-6 text-right font-mono text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
