import React, { useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Briefcase,
  Crown,
  ChevronRight,
  Sparkles,
  Zap,
  Flame,
  Droplets,
  Trash2,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";

const roleProfiles: {
  role: UserRole;
  label: string;
  name: string;
  dept?: string;
  icon: React.ReactNode;
  desc: string;
  badgeColor: string;
}[] = [
  {
    role: "citizen",
    label: "Citizen",
    name: "Rajesh Kumar",
    icon: <User className="h-5 w-5" />,
    desc: "Register complaints & track live resolutions",
    badgeColor: "from-emerald-500 to-teal-600",
  },
  {
    role: "officer",
    label: "Field Officer",
    name: "Priya Sharma",
    dept: "Water Supply",
    icon: <Briefcase className="h-5 w-5" />,
    desc: "Resolve assigned field complaints & SLAs",
    badgeColor: "from-blue-500 to-indigo-600",
  },
  {
    role: "admin",
    label: "Department Admin",
    name: "Vikram Singh",
    icon: <Shield className="h-5 w-5" />,
    desc: "Department workload & officer dispatch",
    badgeColor: "from-amber-500 to-orange-600",
  },
  {
    role: "superadmin",
    label: "Super Admin",
    name: "Anita Desai",
    icon: <Crown className="h-5 w-5" />,
    desc: "City-wide analytics & high-level escalation triage",
    badgeColor: "from-purple-500 to-pink-600",
  },
];

const roleRedirects: Record<UserRole, string> = {
  citizen: "/dashboard",
  officer: "/officer",
  admin: "/admin",
  superadmin: "/superadmin",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [userId, setUserId] = useState("C001");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "citizen") setUserId("C001");
    else if (role === "officer") setUserId("O001");
    else if (role === "admin") setUserId("A001");
    else if (role === "superadmin") setUserId("SA001");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(userId, password, selectedRole);
    navigate(roleRedirects[selectedRole]);
  };

  const quickDemoLogin = (role: UserRole) => {
    login(userId, password, role);
    navigate(roleRedirects[role]);
  };

  const selectedProfile = roleProfiles.find((r) => r.role === selectedRole);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Floating Theme Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left panel - Hero with civic brand */}
      <div className="lg:w-1/2 gradient-hero p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Shield className="h-7 w-7 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold tracking-tight">SUVIDHA</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/10">
                  Smart Desk 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Smart Urban Digital Helpdesk Assistant</p>
            </div>
          </div>

          {/* Hero Titles */}
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Unified Civic Redressal & Kiosk Hub</span>
            </div>
            <h1 className="font-display text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Empowering Citizens,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                Accelerating Solutions.
              </span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              An AI-ready municipal kiosk and portal integrating Electricity, Gas, Water Supply, and Waste Management into a seamless digital helpdesk.
            </p>
          </div>

          {/* Department Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              { name: "Electricity", icon: <Zap className="h-3.5 w-3.5 text-amber-400" />, sla: "4h SLA" },
              { name: "Gas Distribution", icon: <Flame className="h-3.5 w-3.5 text-rose-400" />, sla: "2h SLA" },
              { name: "Water Supply", icon: <Droplets className="h-3.5 w-3.5 text-sky-400" />, sla: "6h SLA" },
              { name: "Waste Management", icon: <Trash2 className="h-3.5 w-3.5 text-emerald-400" />, sla: "12h SLA" },
            ].map((dept) => (
              <div
                key={dept.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-slate-200"
              >
                {dept.icon}
                <span>{dept.name}</span>
                <span className="text-[10px] text-slate-400 font-mono bg-white/10 px-1.5 py-0.5 rounded">
                  {dept.sla}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Metrics Footer */}
        <div className="relative z-10 mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { num: "2,450+", label: "Complaints Resolved", color: "text-amber-400" },
            { num: "98.4%", label: "Citizen Satisfaction", color: "text-emerald-400" },
            { num: "< 24h", label: "Average Turnaround", color: "text-sky-400" },
            { num: "4 Depts", label: "Integrated Live", color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className={`font-display text-xl font-bold ${stat.color}`}>{stat.num}</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Modern Interactive Login */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 z-10">
        <div className="w-full max-w-lg space-y-6">
          
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">Sign In to Suvidha</h2>
            <p className="text-sm text-muted-foreground">
              Select your role profile to access personalized portals and demo data.
            </p>
          </div>

          {/* Role selector grid */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Choose Role Profile
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {roleProfiles.map((r) => {
                const isSelected = selectedRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => handleRoleSelect(r.role)}
                    className={`relative text-left p-3.5 rounded-2xl border-2 transition-all group flex flex-col justify-between ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${r.badgeColor} shadow-sm`}
                      >
                        {r.icon}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                        {r.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {r.name} {r.dept ? `(${r.dept})` : ""}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="userId" className="text-xs font-semibold">User Identification</Label>
              <div className="relative">
                <Input
                  id="userId"
                  type="text"
                  placeholder="e.g. C001"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="h-11 pl-9 rounded-xl bg-background border-border"
                  required
                />
                <User className="h-4 w-4 absolute left-3 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-semibold">Access Key / PIN</Label>
                <span className="text-[11px] text-primary hover:underline cursor-pointer">
                  Forgot PIN?
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pl-9 rounded-xl bg-background border-border"
                  required
                />
                <Lock className="h-4 w-4 absolute left-3 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/25 gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <span>Continue as {selectedProfile?.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* 1-Click Quick Demo Bar */}
          <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Quick 1-Click Demo Login:
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Instant Access</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roleProfiles.map((r) => (
                <Button
                  key={r.role}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickDemoLogin(r.role)}
                  className="h-8 text-[11px] rounded-lg border-border hover:border-primary/50 hover:bg-primary/5"
                >
                  {r.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Citizen Help Support Links */}
          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
              <span>Toll Free: <strong>1912</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
              <span>WhatsApp: <strong>+91 98765 43210</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
