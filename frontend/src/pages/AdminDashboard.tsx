import React, { useState, useMemo } from "react";
import { useTickets } from "@/context/TicketContext";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  List,
  Zap,
  Droplets,
  Flame,
  Trash2,
  Search,
  Download,
  Filter,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Cell
} from "recharts";
import AppHeader from "@/components/AppHeader";
import { toast } from "sonner";
import type { TicketStatus, Department, Ticket } from "@/data/tickets";

const deptIcons: Record<Department, React.ReactNode> = {
  Electricity: <Zap className="h-4 w-4 text-amber-500" />,
  Gas: <Flame className="h-4 w-4 text-rose-500" />,
  "Water Supply": <Droplets className="h-4 w-4 text-sky-500" />,
  "Waste Management": <Trash2 className="h-4 w-4 text-emerald-500" />,
};

const deptBarColors: Record<string, string> = {
  Electricity: "#f59e0b",
  Gas: "#f43f5e",
  "Water Supply": "#0ea5e9",
  "Waste Management": "#10b981",
};

const trendData = [
  { day: "Mon", received: 12, resolved: 10 },
  { day: "Tue", received: 19, resolved: 16 },
  { day: "Wed", received: 15, resolved: 14 },
  { day: "Thu", received: 22, resolved: 20 },
  { day: "Fri", received: 28, resolved: 25 },
  { day: "Sat", received: 18, resolved: 19 },
  { day: "Sun", received: 14, resolved: 15 },
];

export default function AdminDashboard() {
  const { tickets, updateTicketStatus } = useTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");

  const deptStats = (["Electricity", "Gas", "Water Supply", "Waste Management"] as Department[]).map((dept) => {
    const deptTickets = tickets.filter((t) => t.department === dept);
    return {
      dept,
      total: deptTickets.length,
      open: deptTickets.filter((t) => t.status === "open" || t.status === "assigned" || t.status === "in-progress").length,
      resolved: deptTickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
      escalated: deptTickets.filter((t) => t.status === "escalated").length,
    };
  });

  const totalOpen = tickets.filter((t) => t.status === "open" || t.status === "assigned").length;
  const totalInProgress = tickets.filter((t) => t.status === "in-progress").length;
  const totalEscalated = tickets.filter((t) => t.status === "escalated").length;
  const totalResolved = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length;

  const handleStatusChange = (ticketId: string, status: string) => {
    updateTicketStatus(ticketId, status as TicketStatus);
    toast.success(`Ticket ${ticketId} updated to ${status.toUpperCase()}`);
  };

  const handleExportCSV = () => {
    const csvHeader = "ID,Citizen,Department,IssueType,Priority,Status,Created\n";
    const csvRows = tickets
      .map((t) => `"${t.id}","${t.citizenName}","${t.department}","${t.issueType}","${t.priority}","${t.status}","${t.createdAt}"`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `suvidha_tickets_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Ticket report exported to CSV successfully!");
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.issueType.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedDeptFilter !== "all" && t.department !== selectedDeptFilter) return false;
      if (selectedStatusFilter !== "all" && t.status !== selectedStatusFilter) return false;
      return true;
    });
  }, [tickets, searchQuery, selectedDeptFilter, selectedStatusFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-7xl px-4 sm:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
                Department Operations Portal
              </span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Administrative Control Center
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live monitoring, department performance metrics, SLA compliance & dispatcher
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="h-10 px-4 rounded-xl gap-2 text-xs font-semibold border-border hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Global Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "New & Pending", value: totalOpen, icon: <List className="h-5 w-5 text-sky-500" />, color: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400", sub: "Awaiting dispatch" },
            { label: "In Field Resolution", value: totalInProgress, icon: <Clock className="h-5 w-5 text-amber-500" />, color: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400", sub: "Assigned to officers" },
            { label: "Critical Escalations", value: totalEscalated, icon: <AlertTriangle className="h-5 w-5 text-rose-500" />, color: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400", sub: "Exceeded initial SLA" },
            { label: "Total Resolved", value: totalResolved, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400", sub: "Completed & closed" },
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

        {/* Charts & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Department Volume Bar Chart */}
          <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="p-5 sm:p-6 pb-2">
              <CardTitle className="font-display text-lg font-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Departmental Grievance Distribution
              </CardTitle>
              <CardDescription className="text-xs">
                Active tickets comparison across civic utilities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-0">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptStats} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                      {deptStats.map((entry) => (
                        <Cell key={entry.dept} fill={deptBarColors[entry.dept] || "#3b82f6"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Inflow & Resolution Area Chart */}
          <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="p-5 sm:p-6 pb-2">
              <CardTitle className="font-display text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Weekly Inflow vs Resolution Velocity
              </CardTitle>
              <CardDescription className="text-xs">
                7-day rolling turnaround performance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-0">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Area type="monotone" dataKey="received" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRec)" name="New Inflow" />
                    <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deptStats.map((d) => (
            <Card key={d.dept} className="border border-border/80 shadow-sm rounded-2xl overflow-hidden bg-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-muted">{deptIcons[d.dept]}</div>
                    <span className="font-display font-bold text-sm">{d.dept}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-muted-foreground">{d.total} Total</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-muted/40 rounded-xl border border-border/50">
                  <div>
                    <div className="font-bold text-base text-sky-600 dark:text-sky-400">{d.open}</div>
                    <span className="text-[10px] text-muted-foreground font-medium">Pending</span>
                  </div>
                  <div>
                    <div className="font-bold text-base text-rose-600 dark:text-rose-400">{d.escalated}</div>
                    <span className="text-[10px] text-muted-foreground font-medium">Escalated</span>
                  </div>
                  <div>
                    <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">{d.resolved}</div>
                    <span className="text-[10px] text-muted-foreground font-medium">Resolved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Master Ticket Table */}
        <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden">
          <CardHeader className="p-5 sm:p-6 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl font-bold">All System Tickets</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Filter by department, search keywords, or reassign field status
              </CardDescription>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48 sm:w-56">
                <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs rounded-xl bg-background"
                />
              </div>

              <Select value={selectedDeptFilter} onValueChange={setSelectedDeptFilter}>
                <SelectTrigger className="h-8 w-36 text-xs rounded-xl">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Gas">Gas</SelectItem>
                  <SelectItem value="Water Supply">Water Supply</SelectItem>
                  <SelectItem value="Waste Management">Waste Mgmt</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
                <SelectTrigger className="h-8 w-32 text-xs rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground font-semibold text-left">
                    <th className="p-3.5 pl-6">Token ID</th>
                    <th className="p-3.5">Citizen</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Issue Type & Summary</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Assigned Officer</th>
                    <th className="p-3.5 pr-6 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5 pl-6 font-mono font-bold text-primary">{ticket.id}</td>
                      <td className="p-3.5 font-medium">{ticket.citizenName}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          {deptIcons[ticket.department]}
                          <span>{ticket.department}</span>
                        </div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <div className="font-semibold text-foreground truncate">{ticket.issueType}</div>
                        <div className="text-muted-foreground truncate text-[11px]">{ticket.description}</div>
                      </td>
                      <td className="p-3.5"><PriorityBadge priority={ticket.priority} /></td>
                      <td className="p-3.5"><StatusBadge status={ticket.status} /></td>
                      <td className="p-3.5 font-medium text-foreground/80">
                        {ticket.assignedOfficer || <span className="text-muted-foreground italic">Unassigned</span>}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        {ticket.status !== "resolved" && ticket.status !== "closed" ? (
                          <Select onValueChange={(v) => handleStatusChange(ticket.id, v)}>
                            <SelectTrigger className="h-7 w-28 text-[11px] rounded-lg ml-auto">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent align="end">
                              <SelectItem value="assigned">Assign Officer</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="escalated">Escalate (High)</SelectItem>
                              <SelectItem value="resolved">Force Resolve</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Completed
                          </span>
                        )}
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
