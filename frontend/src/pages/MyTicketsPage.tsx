import React, { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketContext";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Calendar,
  Sparkles,
  Filter,
  PlusCircle
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import TicketReceiptModal from "@/components/TicketReceiptModal";
import { Ticket, TicketStatus } from "@/data/tickets";
import { toast } from "sonner";

const feedbackTags = ["Prompt Resolution", "Polite Field Officer", "Work Completed Cleanly", "Clear Communication"];

export default function MyTicketsPage() {
  const { user } = useAuth();
  const { tickets, addFeedback } = useTickets();
  const [searchParams] = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedReceiptTicket, setSelectedReceiptTicket] = useState<Ticket | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  // Feedback state
  const [feedbackTicketId, setFeedbackTicketId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [selectedFeedbackTags, setSelectedFeedbackTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const myTickets = tickets.filter((t) => t.citizenId === user?.id);

  const filteredTickets = useMemo(() => {
    return myTickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;
      if (activeFilter === "active") return ticket.status === "open" || ticket.status === "assigned" || ticket.status === "in-progress";
      if (activeFilter === "resolved") return ticket.status === "resolved" || ticket.status === "closed";
      if (activeFilter === "escalated") return ticket.status === "escalated";
      return true;
    });
  }, [myTickets, searchQuery, activeFilter]);

  const handleOpenReceipt = (ticket: Ticket) => {
    setSelectedReceiptTicket(ticket);
    setReceiptModalOpen(true);
  };

  const toggleFeedbackTag = (tag: string) => {
    setSelectedFeedbackTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitFeedback = (ticketId: string) => {
    const fullComment = selectedFeedbackTags.length > 0
      ? `${comment ? comment + " | " : ""}Highlights: ${selectedFeedbackTags.join(", ")}`
      : comment || "Satisfied with service.";

    addFeedback(ticketId, rating, fullComment);
    setFeedbackTicketId(null);
    setComment("");
    setSelectedFeedbackTags([]);
    toast.success("Thank you! Your feedback has been recorded.");
  };

  const timelineSteps: TicketStatus[] = ["open", "assigned", "in-progress", "resolved"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <AppHeader />

      <main className="container py-8 max-w-5xl px-4 sm:px-8 space-y-6">
        
        {/* Header & New Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              My Service Complaints
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live tracking, field updates, receipts, and feedback history
            </p>
          </div>
          <Link to="/raise-ticket">
            <Button className="rounded-2xl font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 gap-2 h-10 px-5">
              <PlusCircle className="h-4 w-4" />
              <span>Raise Ticket</span>
            </Button>
          </Link>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: `All (${myTickets.length})` },
              { id: "active", label: `Active (${myTickets.filter(t => t.status === "open" || t.status === "assigned" || t.status === "in-progress").length})` },
              { id: "resolved", label: `Resolved (${myTickets.filter(t => t.status === "resolved" || t.status === "closed").length})` },
              { id: "escalated", label: `Escalated (${myTickets.filter(t => t.status === "escalated").length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Search by ID, issue or dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 pr-3 text-xs rounded-xl bg-background"
            />
          </div>
        </div>

        {/* Tickets Listing */}
        {filteredTickets.length === 0 ? (
          <Card className="border border-dashed border-border rounded-3xl p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
              <Filter className="h-5 w-5 opacity-40" />
            </div>
            <h3 className="font-semibold text-base">No Matching Complaints Found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords or filter tab to view other complaints.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => {
              const currentStepIdx = timelineSteps.indexOf(
                ticket.status === "escalated" ? "in-progress" : ticket.status === "closed" ? "resolved" : ticket.status
              );

              return (
                <Card
                  key={ticket.id}
                  className="border border-border/80 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-card"
                >
                  <CardContent className="p-5 sm:p-6 space-y-4">
                    
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                          {ticket.id}
                        </span>
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenReceipt(ticket)}
                          className="h-7 text-xs px-2.5 rounded-lg gap-1 border-border font-medium"
                        >
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          Receipt
                        </Button>
                      </div>
                    </div>

                    {/* Complaint Content */}
                    <div>
                      <h3 className="font-semibold text-base text-foreground leading-snug">
                        {ticket.description}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{ticket.department}</span>
                        <span>•</span>
                        <span>{ticket.issueType}</span>
                        {ticket.assignedOfficer && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-primary font-medium">
                              <UserCheck className="h-3.5 w-3.5" />
                              Assigned: {ticket.assignedOfficer}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Visual Progress Timeline */}
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2">
                        <span>Resolution Progress Timeline</span>
                        <span className="font-mono text-[10px] text-primary">SLA 24-48h</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        {timelineSteps.map((stepName, idx) => {
                          const isDone = idx <= currentStepIdx;
                          const isCurrent = idx === currentStepIdx;
                          return (
                            <React.Fragment key={stepName}>
                              <div
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                                  isDone
                                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {isDone && <CheckCircle2 className="h-3 w-3" />}
                                <span className="capitalize">{stepName.replace("-", " ")}</span>
                              </div>
                              {idx < timelineSteps.length - 1 && (
                                <div
                                  className={`flex-1 h-0.5 rounded-full ${
                                    idx < currentStepIdx ? "bg-primary" : "bg-border"
                                  }`}
                                />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>

                    {/* Citizen Feedback Section */}
                    {ticket.status === "resolved" && !ticket.feedback && (
                      <div className="pt-2">
                        {feedbackTicketId === ticket.id ? (
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                Rate Service Resolution
                              </span>
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                {rating} of 5 Stars
                              </span>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setRating(num)}
                                  className="p-1 hover:scale-110 transition-transform"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      num <= rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground/40"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>

                            {/* Feedback Tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {feedbackTags.map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => toggleFeedbackTag(tag)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                                    selectedFeedbackTags.includes(tag)
                                      ? "bg-amber-500 text-slate-950 border-amber-500 font-semibold"
                                      : "bg-background border-border text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>

                            <Textarea
                              placeholder="Any additional feedback for the municipal team..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="text-xs rounded-xl bg-background"
                            />

                            <div className="flex items-center gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setFeedbackTicketId(null)}
                                className="text-xs h-8"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSubmitFeedback(ticket.id)}
                                className="text-xs h-8 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                              >
                                Submit Rating
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                              This issue has been resolved. How was your experience?
                            </span>
                            <Button
                              size="sm"
                              onClick={() => setFeedbackTicketId(ticket.id)}
                              className="h-8 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 gap-1.5"
                            >
                              <Star className="h-3.5 w-3.5 fill-white" />
                              Rate Service
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Recorded Feedback Display */}
                    {ticket.feedback && (
                      <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Your Rating:</span>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`h-3.5 w-3.5 ${
                                  s <= ticket.feedback!.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground italic font-medium ml-1">
                            "{ticket.feedback.comment}"
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                          Verified Citizen Review
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
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
