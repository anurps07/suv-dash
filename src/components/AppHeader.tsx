import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LogOut,
  Home,
  PlusCircle,
  List,
  Users,
  Shield,
  BarChart3,
  Menu,
  X,
  Bell,
  Languages,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const roleLinks: Record<string, { label: string; path: string; icon: React.ReactNode }[]> = {
  citizen: [
    { label: "Dashboard", path: "/dashboard", icon: <Home className="h-4 w-4" /> },
    { label: "Raise Ticket", path: "/raise-ticket", icon: <PlusCircle className="h-4 w-4" /> },
    { label: "My Tickets", path: "/my-tickets", icon: <List className="h-4 w-4" /> },
  ],
  officer: [
    { label: "Dashboard", path: "/officer", icon: <Home className="h-4 w-4" /> },
    { label: "Assigned Tickets", path: "/officer/tickets", icon: <List className="h-4 w-4" /> },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "All Tickets", path: "/admin/tickets", icon: <List className="h-4 w-4" /> },
    { label: "Officers", path: "/admin/officers", icon: <Users className="h-4 w-4" /> },
  ],
  superadmin: [
    { label: "Control Panel", path: "/superadmin", icon: <Shield className="h-4 w-4" /> },
    { label: "All Tickets", path: "/admin/tickets", icon: <List className="h-4 w-4" /> },
    { label: "Escalations", path: "/superadmin/escalations", icon: <BarChart3 className="h-4 w-4" /> },
  ],
};

const mockNotifications = [
  { id: 1, title: "Ticket Resolved", desc: "TKT-2026-005 has been resolved by Sunita Devi.", time: "10m ago", unread: true },
  { id: 2, title: "Officer Assigned", desc: "Officer Priya Sharma was assigned to your water complaint.", time: "1h ago", unread: true },
  { id: 3, title: "System Maintenance", desc: "Scheduled municipal database sync at 11 PM IST.", time: "3h ago", unread: false },
];

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [notifications, setNotifications] = useState(mockNotifications);

  if (!user) return null;

  const links = roleLinks[user.role] || [];
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const roleColors: Record<string, string> = {
    citizen: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    officer: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    admin: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    superadmin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-white/10 text-white backdrop-blur-xl shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/20 transition-transform group-hover:scale-105">
              <Shield className="h-6 w-6 text-slate-950 font-bold" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  SUVIDHA
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  v2.4 Smart Desk
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Urban Citizen Helpdesk System
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Header Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Status Pill */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kiosks Online</span>
          </div>

          {/* Language Selector */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang((prev) => (prev === "EN" ? "HI" : "EN"))}
            className="text-xs font-semibold h-8 px-2.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 flex items-center gap-1"
          >
            <Languages className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === "EN" ? "English" : "हिंदी"}</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl border border-white/10"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 glass-card shadow-2xl border-white/10">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-amber-500" />
                  <span className="font-semibold text-sm">Notifications</span>
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline font-medium">
                    Mark read
                  </button>
                )}
              </div>
              <div className="divide-y divide-border/50 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 text-xs transition-colors hover:bg-muted/50 ${n.unread ? "bg-primary/5" : ""}`}>
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">{n.time}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 gap-2">
                <div className="h-6 w-6 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold text-white leading-none">{user.name}</div>
                  <div className="text-[10px] text-slate-400 capitalize mt-0.5">{user.role}</div>
                </div>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card shadow-2xl border-white/10">
              <DropdownMenuLabel>
                <div className="text-xs font-bold text-foreground">{user.name}</div>
                <div className="text-[11px] text-muted-foreground">{user.email}</div>
                <div className="mt-2">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${roleColors[user.role]}`}>
                    {user.role} {user.department ? `· ${user.department}` : ""}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive font-medium cursor-pointer gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10 rounded-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav className="md:hidden glass-header border-t border-white/10 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname === link.path
                  ? "bg-white/20 text-white font-bold"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
