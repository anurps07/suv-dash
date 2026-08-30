import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketContext";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  List,
  Search,
  MapPin,
  PhoneCall,
  User,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { toast } from "sonner";
import type { TicketStatus, Ticket } from "@/data/tickets";

export default function OfficerDashboard() {
  const { user } = useAuth();
  const { tickets, updateTicketStatus } = useTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const assignedTickets = tickets.filter((t) => t.assignedOfficer === user?.name || !t.assignedOfficer);

  const inProgressCount = assignedTickets.filter((t) => t.status === "in-progress").length;
  const resolvedCount = assignedTickets.filter((t) => t.status === "resolved" || t.status === "closed").length;
  const escalatedCount = assignedTickets.filter((t) => t.status === "escalated").length;

  const stats = [
    {
      label: "My Assigned Workload",
      value: assignedTickets.length,
      icon: <List className="h-5 w-5 text-sky-500" />,
      color: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
      sub: "Active field tickets",
    },
    {
      label: "Field Work in Progress",
      value: inProgressCount,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      sub: "Technician on site",
    },
    {
      label: "Successfully Resolved",
      value: resolvedCount,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      sub: "Citizen signed off",
    },
    {
      label: "Escalated to Control",
      value: escalatedCount,
      icon: <AlertTriangle className="h-5 w-5 text-rose-500" />,
      color: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
      sub: "Requires spare parts/supervision",
    },
  ];

  const handleStatusChange = (ticketId: string, status: string) => {
    updateTicketStatus(ticketId, status as TicketStatus);
    toast.success(`Ticket ${ticketId} updated to ${status.toUpperCase()}`);
  };

  const filteredTickets = assignedTickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.issueType.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    if (statusFilter === "in-progress") return t.status === "in-progress";
    if (statusFilter === "open") return t.status === "open" || t.status === "assigned";
    if (statusFilter === "resolved") return t.status === "resolved" || t.status === "closed";
    if (statusFilter === "escalated") return t.status === "escalated";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-7xl px-4 sm:px-8 space-y-8">
        
        {/* Officer Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl gradient-hero text-white border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold">
                Field Officer Active Duty
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Online & Dispatch Ready
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Officer {user?.name}
            </h1>
            <p className="text-sm text-slate-300">
              Department: <strong>{user?.department || "Water Supply"}</strong> · Jurisdiction: Sector 14-22 Urban Grid
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Response SLA Status</div>
              <div className="text-sm font-bold text-emerald-400">96.8% In Compliance</div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
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

        {/* Assigned Tickets Management */}
        <Card className="border border-border/80 shadow-md rounded-3xl overflow-hidden">
          <CardHeader className="p-5 sm:p-6 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl font-bold">Field Work Orders</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Update status, mark completion, or escalate blocked tickets
              </CardDescription>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search work orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs rounded-xl bg-background"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-36 text-xs rounded-xl">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open / Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-2">
                <CheckCircle2 className="h-10 w-10 mx-auto text-muted-foreground/40" />
                <h3 className="font-semibold text-sm">No Pending Work Orders</h3>
                <p className="text-xs text-muted-foreground">All assigned tasks are clear or match no filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-5 hover:bg-muted/30 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
                          {ticket.id}
                        </span>
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                        <span className="text-[11px] text-muted-foreground font-mono">
                          Submitted: {new Date(ticket.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <p className="font-semibold text-sm text-foreground">{ticket.description}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 text-foreground/80 font-medium">
                          <User className="h-3.5 w-3.5 text-primary" />
                          Citizen: {ticket.citizenName}
                        </span>
                        <span>•</span>
                        <span>{ticket.department} · {ticket.issueType}</span>
                        {ticket.feedback && (
                          <>
                            <span>•</span>
                            <span className="text-amber-500 font-semibold">
                              Rating: {ticket.feedback.rating}/5 ⭐
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Officer Status Control Dropdown */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                      {ticket.status !== "resolved" && ticket.status !== "closed" ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(ticket.id, "in-progress")}
                            disabled={ticket.status === "in-progress"}
                            className="h-9 text-xs rounded-xl border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 font-semibold"
                          >
                            In Progress
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(ticket.id, "resolved")}
                            className="h-9 text-xs rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-semibold shadow-sm gap-1"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Mark Resolved
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStatusChange(ticket.id, "escalated")}
                            className="h-9 text-xs rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 hover:text-rose-700 font-semibold"
                          >
                            Escalate
                          </Button>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                          <CheckCircle2 className="h-4 w-4" /> Work Complete
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
