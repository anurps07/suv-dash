import React from "react";
import { Ticket } from "@/data/tickets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Check, Copy, Shield, QrCode, FileText, ExternalLink } from "lucide-react";
import { StatusBadge, PriorityBadge } from "./StatusBadge";
import { toast } from "sonner";

interface TicketReceiptModalProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TicketReceiptModal({ ticket, open, onOpenChange }: TicketReceiptModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/my-tickets?id=${ticket.id}`);
    setCopied(true);
    toast.success("Tracking link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[95vw] p-0 overflow-hidden border border-border/80 shadow-2xl rounded-2xl bg-card">
        {/* Receipt Header styling */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Shield className="h-7 w-7 text-slate-950 font-bold" />
            </div>
          </div>
          <h2 className="font-display font-bold text-xl tracking-tight text-white">SUVIDHA HELPDESK</h2>
          <p className="text-xs text-slate-300 tracking-wider uppercase mt-0.5">
            Smart Urban Digital Service Receipt
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono text-amber-300 border border-white/10">
            <span>TOKEN NO:</span>
            <strong className="tracking-widest">{ticket.id}</strong>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-dashed border-border text-xs">
            <div>
              <span className="text-muted-foreground block">Citizen Name</span>
              <strong className="text-foreground text-sm font-medium">{ticket.citizenName}</strong>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground block">Submission Date</span>
              <span className="text-foreground font-mono text-xs">
                {new Date(ticket.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-semibold text-foreground">{ticket.department}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Issue Category:</span>
              <span className="font-medium text-foreground">{ticket.issueType}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Current Status:</span>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Priority Level:</span>
              <PriorityBadge priority={ticket.priority} />
            </div>
            {ticket.assignedOfficer && (
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">Assigned Officer:</span>
                <span className="font-medium text-primary">{ticket.assignedOfficer}</span>
              </div>
            )}
          </div>

          <div className="bg-muted/60 p-3 rounded-xl border border-border/60">
            <span className="text-xs text-muted-foreground font-medium block mb-1">Complaint Summary:</span>
            <p className="text-xs text-foreground leading-relaxed italic line-clamp-3">"{ticket.description}"</p>
          </div>

          {/* QR Code & Barcode Mockup */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <QrCode className="h-10 w-10 text-slate-800" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-foreground">Scan to Track Live</p>
                <p className="text-[11px] text-muted-foreground">Official Government Portal</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-muted-foreground block">ESTIMATED SLA</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">24-48 Hours</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-muted/40 p-4 border-t border-border flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs rounded-xl flex-1">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button onClick={handlePrint} size="sm" className="gap-1.5 text-xs rounded-xl flex-1 bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <Printer className="h-3.5 w-3.5" />
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
