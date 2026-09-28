import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketContext";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  List,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Zap,
  Flame,
  Droplets,
  Trash2,
  ArrowRight,
  Printer,
  Sparkles,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import AppHeader from "@/components/AppHeader";
import TicketReceiptModal from "@/components/TicketReceiptModal";
import { Ticket } from "@/data/tickets";

export default function CitizenDashboard() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReceiptTicket, setSelectedReceiptTicket] = useState<Ticket | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const myTickets = tickets.filter((t) => t.citizenId === user?.id);

  const inProgressCount = myTickets.filter((t) => t.status === "in-progress" || t.status === "assigned").length;
  const resolvedCount = myTickets.filter((t) => t.status === "resolved" || t.status === "closed").length;
  const escalatedCount = myTickets.filter((t) => t.status === "escalated").length;

  const stats = [
    {
      label: "Total Submissions",
      value: myTickets.length,
      icon: <List className="h-5 w-5 text-sky-500" />,
      color: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
      sub: "Active civic requests",
    },
    {
      label: "Active / In Progress",
      value: inProgressCount,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      sub: "Field work underway",
    },
    {
      label: "Successfully Resolved",
      value: resolvedCount,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      sub: "Verified completion",
    },
    {
      label: "Escalated to High Priority",
      value: escalatedCount,
      icon: <AlertTriangle className="h-5 w-5 text-rose-500" />,
      color: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
      sub: "Supervisory review",
    },
  ];

  const quickDepts = [
    { name: "Electricity", icon: <Zap className="h-5 w-5 text-amber-500" />, bg: "hover:border-amber-500/50 hover:bg-amber-500/5" },
    { name: "Gas Distribution", icon: <Flame className="h-5 w-5 text-rose-500" />, bg: "hover:border-rose-500/50 hover:bg-rose-500/5" },
    { name: "Water Supply", icon: <Droplets className="h-5 w-5 text-sky-500" />, bg: "hover:border-sky-500/50 hover:bg-sky-500/5" },
    { name: "Waste Management", icon: <Trash2 className="h-5 w-5 text-emerald-500" />, bg: "hover:border-emerald-500/50 hover:bg-emerald-500/5" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/my-tickets?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const openReceipt = (ticket: Ticket) => {
    setSelectedReceiptTicket(ticket);
    setReceiptModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-7xl px-4 sm:px-8 space-y-8">
        
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl gradient-hero text-white p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Verified Citizen Profile · ID: {user?.id}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Namaste, {user?.name}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Welcome to the SUVIDHA Public Utility Assistance Portal. Submit new civic complaints, monitor resolution SLA timelines, or track token status in real-time.
              </p>
            </div>

            {/* Hero Quick Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <Link to="/raise-ticket" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-11 px-6 rounded-2xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 gap-2 transition-all">
                  <PlusCircle className="h-4 w-4" />
                  Raise New Ticket
                </Button>
              </Link>
              <Link to="/my-tickets" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-2xl font-medium border-white/20 text-white hover:bg-white/10 gap-2">
                  <List className="h-4 w-4" />
                  View All Tickets
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Search & Track bar */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Enter Ticket ID (e.g. TKT-2026-001) or issue keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-10 pr-4 rounded-xl bg-white/10 border-white/15 text-white placeholder:text-slate-400 focus:bg-white/15 focus:border-amber-400"
                />
              </div>
              <Button type="submit" className="h-11 px-6 rounded-xl font-semibold bg-white text-slate-950 hover:bg-slate-100 shrink-0">
                Track Ticket
              </Button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <Card key={stat.label} className="border border-border/80 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden bg-card">
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

        {/* 1-Click Quick Department Launchers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Quick Department Helpdesks</h2>
            <span className="text-xs text-muted-foreground">Select department to file immediately</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickDepts.map((dept) => (
              <Link key={dept.name} to="/raise-ticket">
                <div className={`p-4 rounded-2xl border border-border bg-card transition-all flex items-center gap-3 cursor-pointer group ${dept.bg}`}>
                  <div className="p-2.5 rounded-xl bg-muted group-hover:scale-110 transition-transform">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground">{dept.name}</h3>
                    <span className="text-[11px] text-muted-foreground group-hover:text-primary flex items-center gap-1 mt-0.5">
                      New Complaint <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Tickets Table / Cards */}
        <Card className="border border-border/80 shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 p-5 sm:p-6">
            <div>
              <CardTitle className="font-display text-xl font-bold">Recent Ticket Filings</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Real-time status updates and resolution timelines
              </CardDescription>
            </div>
            <Link to="/my-tickets">
              <Button variant="ghost" size="sm" className="text-xs font-semibold gap-1 text-primary hover:text-primary/80">
                <span>View All Tickets ({myTickets.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {myTickets.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <TrendingUp className="h-6 w-6 opacity-40" />
                </div>
                <h3 className="font-semibold text-base">No Tickets Raised Yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  You haven't filed any complaints under this citizen profile yet. Raise your first ticket to track resolution in real time.
                </p>
                <Link to="/raise-ticket">
                  <Button size="sm" className="rounded-xl mt-2 gap-1.5">
                    <PlusCircle className="h-4 w-4" /> Raise a Complaint
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {myTickets.slice(0, 5).map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 sm:p-5 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                          {ticket.id}
                        </span>
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="font-medium text-sm text-foreground truncate">{ticket.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{ticket.department}</span>
                        <span>•</span>
                        <span>{ticket.issueType}</span>
                        {ticket.assignedOfficer && (
                          <>
                            <span>•</span>
                            <span className="text-primary font-medium">Officer: {ticket.assignedOfficer}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReceipt(ticket)}
                        className="h-8 text-xs rounded-xl gap-1.5 border-border hover:bg-muted font-medium"
                      >
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Receipt</span>
                      </Button>
                      <Link to="/my-tickets">
                        <Button size="sm" variant="ghost" className="h-8 text-xs rounded-xl font-medium">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Civic Helpdesk Callout */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Emergency Citizen Helpline</h3>
              <p className="text-xs text-muted-foreground">
                For major gas leaks, live wire hazards, or severe water main bursts, call the 24x7 control room.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:1912">
              <Button size="sm" className="rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                Call 1912
              </Button>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-xs font-semibold">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>

      </main>

      {/* Printable Receipt Modal */}
      <TicketReceiptModal
        ticket={selectedReceiptTicket}
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
      />
    </div>
  );
}
