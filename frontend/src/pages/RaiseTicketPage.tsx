import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketContext";
import { Department, departmentIssues, Priority, Ticket } from "@/data/tickets";
import {
  Zap,
  Flame,
  Droplets,
  Trash2,
  ChevronRight,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  MapPin,
  Clock,
  AlertCircle,
  FileCheck,
  Sparkles,
  Shield,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppHeader from "@/components/AppHeader";
import TicketReceiptModal from "@/components/TicketReceiptModal";
import { toast } from "sonner";

const departmentMeta: {
  name: Department;
  icon: React.ReactNode;
  sla: string;
  gradient: string;
  badge: string;
  desc: string;
}[] = [
  {
    name: "Electricity",
    icon: <Zap className="h-7 w-7 text-amber-500" />,
    sla: "4h Response SLA",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent hover:border-amber-500/50",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    desc: "Power cuts, transformer faults, street light failure, billing",
  },
  {
    name: "Gas",
    icon: <Flame className="h-7 w-7 text-rose-500" />,
    sla: "2h Emergency SLA",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent hover:border-rose-500/50",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    desc: "Gas leaks, pressure drop, pipeline damage, connection",
  },
  {
    name: "Water Supply",
    icon: <Droplets className="h-7 w-7 text-sky-500" />,
    sla: "6h Response SLA",
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent hover:border-sky-500/50",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
    desc: "No water supply, dirty water, pipeline leak, low pressure",
  },
  {
    name: "Waste Management",
    icon: <Trash2 className="h-7 w-7 text-emerald-500" />,
    sla: "12h Cleanup SLA",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent hover:border-emerald-500/50",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    desc: "Garbage collection, overflowing bins, drain cleaning",
  },
];

export default function RaiseTicketPage() {
  const { user } = useAuth();
  const { addTicket } = useTickets();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Receipt Modal on Submission
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const handleDeptSelect = (dept: Department) => {
    setSelectedDept(dept);
    setIssueType("");
    setStep(2);
  };

  const handleSimulateUpload = () => {
    const sampleFiles = ["photo_proof_junction.jpg", "meter_reading_bill.pdf", "site_location_photo.png"];
    const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    if (!attachedFiles.includes(randomFile)) {
      setAttachedFiles((prev) => [...prev, randomFile]);
      toast.info(`Attached: ${randomFile}`);
    }
  };

  const removeFile = (name: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDept || !issueType || !description) {
      toast.error("Please fill in all mandatory fields");
      return;
    }

    const fullDescription = location
      ? `${description} (Location: ${location})`
      : description;

    const newTicketData = {
      citizenName: user?.name || "Rajesh Kumar",
      citizenId: user?.id || "C001",
      department: selectedDept,
      issueType,
      description: fullDescription,
      priority,
    };

    addTicket(newTicketData);

    // Mock generated ticket for instant receipt
    const mockCreatedTicket: Ticket = {
      ...newTicketData,
      id: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGeneratedTicket(mockCreatedTicket);
    setReceiptOpen(true);
    toast.success("Complaint filed successfully!", {
      description: `Token generated: ${mockCreatedTicket.id}`,
    });
  };

  const currentDeptMeta = departmentMeta.find((d) => d.name === selectedDept);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-4xl px-4 sm:px-8 space-y-6">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-xl text-xs font-semibold"
            onClick={() => (step === 2 ? setStep(1) : navigate("/dashboard"))}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{step === 2 ? "Back to Departments" : "Back to Dashboard"}</span>
          </Button>

          <span className="text-xs font-mono text-muted-foreground">
            Step {step} of 2
          </span>
        </div>

        {/* Step Progress Tracker */}
        <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                step >= 1
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Select Department</div>
              <div className="text-[11px] text-muted-foreground">Choose civic service branch</div>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-border rounded-full mx-2 hidden sm:block">
            <div
              className={`h-full bg-primary transition-all duration-300 ${
                step === 2 ? "w-full" : "w-0"
              }`}
            />
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                step >= 2
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Complaint Details</div>
              <div className="text-[11px] text-muted-foreground">Category, description & location</div>
            </div>
          </div>
        </div>

        {/* STEP 1: Department Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Select Municipal Department
              </h1>
              <p className="text-sm text-muted-foreground">
                Choose the relevant utility authority handling your grievance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {departmentMeta.map((dept) => (
                <div
                  key={dept.name}
                  onClick={() => handleDeptSelect(dept.name)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group bg-card hover:shadow-xl relative overflow-hidden bg-gradient-to-br ${dept.gradient} ${
                    selectedDept === dept.name
                      ? "border-primary shadow-lg ring-2 ring-primary/20"
                      : "border-border/80"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-background/80 backdrop-blur-sm border border-border shadow-sm group-hover:scale-110 transition-transform">
                      {dept.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${dept.badge}`}>
                      {dept.sla}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dept.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                    <span>Continue filing</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Issue Details Form */}
        {step === 2 && selectedDept && currentDeptMeta && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Complaint Details
                </h1>
                <p className="text-sm text-muted-foreground">
                  Provide details to ensure swift assignment and field resolution.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted border border-border self-start">
                <div className="p-1 rounded-lg bg-background">{currentDeptMeta.icon}</div>
                <span className="text-xs font-bold">{selectedDept}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${currentDeptMeta.badge}`}>
                  {currentDeptMeta.sla}
                </span>
              </div>
            </div>

            <Card className="border border-border/80 shadow-xl rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Issue Category Chips */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Issue Category <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {departmentIssues[selectedDept].map((issue) => (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => setIssueType(issue)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                            issueType === issue
                              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 font-semibold"
                              : "bg-muted/60 text-foreground border-border hover:border-primary/40 hover:bg-muted"
                          }`}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority / Urgency Selector */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Urgency / Priority Level <span className="text-destructive">*</span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { val: "low", label: "Low", desc: "Non-critical query" },
                        { val: "medium", label: "Medium", desc: "Standard SLA" },
                        { val: "high", label: "High", desc: "Affects entire lane" },
                        { val: "emergency", label: "🚨 Emergency", desc: "Hazard / Leak / Fire" },
                      ].map((p) => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => setPriority(p.val as Priority)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            priority === p.val
                              ? p.val === "emergency"
                                ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/20 font-bold"
                                : "bg-primary/10 border-primary text-primary ring-2 ring-primary/20 font-bold"
                              : "bg-muted/40 border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          <div className="text-xs font-semibold">{p.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{p.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location / Landmark */}
                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-xs font-bold">
                      Location / Address Landmark
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder="e.g. Flat 402, Block B, Sector 15 (Near City Hospital)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-11 pl-10 rounded-xl bg-background"
                      />
                      <MapPin className="h-4 w-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="desc" className="text-xs font-bold">
                      Detailed Complaint Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="desc"
                      placeholder="Please explain the exact problem, when it started, and any identifying meter/pole numbers..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px] rounded-xl bg-background text-sm leading-relaxed"
                      required
                    />
                  </div>

                  {/* Mock Attachment Upload Zone */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Upload Photos or Bills (Optional)</Label>
                    <div
                      onClick={handleSimulateUpload}
                      className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-5 text-center cursor-pointer bg-muted/20 hover:bg-primary/5 transition-colors"
                    >
                      <UploadCloud className="h-7 w-7 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs font-semibold text-foreground">Click to upload photo or bill</p>
                      <p className="text-[11px] text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                    </div>

                    {attachedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {attachedFiles.map((file) => (
                          <div
                            key={file}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-foreground font-medium"
                          >
                            <FileCheck className="h-3.5 w-3.5 text-primary" />
                            <span>{file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(file)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="h-11 px-5 rounded-xl font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!issueType || !description}
                      className="h-11 px-8 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 gap-2 flex-1 sm:flex-none"
                    >
                      <Sparkles className="h-4 w-4" />
                      Submit & Generate Receipt
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Printable Receipt Modal */}
      <TicketReceiptModal
        ticket={generatedTicket}
        open={receiptOpen}
        onOpenChange={(open) => {
          setReceiptOpen(open);
          if (!open) navigate("/my-tickets");
        }}
      />
    </div>
  );
}
