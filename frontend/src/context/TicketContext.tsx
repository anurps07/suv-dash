import React, { createContext, useContext, useState, ReactNode } from "react";
import { Ticket, mockTickets } from "@/data/tickets";
import type { Department, Priority, TicketStatus } from "@/data/tickets";

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "status">) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  addFeedback: (id: string, rating: number, comment: string) => void;
}

const TicketContext = createContext<TicketContextType | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const addTicket = (data: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "status">) => {
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      ...data,
      id: `TKT-2026-${String(tickets.length + 1).padStart(3, "0")}`,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t))
    );
  };

  const addFeedback = (id: string, rating: number, comment: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, feedback: { rating, comment }, status: "closed" as TicketStatus, updatedAt: new Date().toISOString() } : t))
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, addFeedback }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
