export type TicketStatus = "open" | "assigned" | "in-progress" | "escalated" | "resolved" | "closed";
export type Department = "Electricity" | "Gas" | "Water Supply" | "Waste Management";
export type Priority = "low" | "medium" | "high" | "emergency";

export interface Ticket {
  id: string;
  citizenName: string;
  citizenId: string;
  department: Department;
  issueType: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  assignedOfficer?: string;
  createdAt: string;
  updatedAt: string;
  feedback?: { rating: number; comment: string };
}

export const departmentIssues: Record<Department, string[]> = {
  Electricity: ["Power Cut", "Meter Fault", "Billing Issue", "New Connection", "Street Light"],
  Gas: ["Gas Leak", "Low Pressure", "New Connection", "Meter Issue", "Pipeline Damage"],
  "Water Supply": ["No Water", "Low Pressure", "Dirty Water", "Leakage", "New Connection"],
  "Waste Management": ["Garbage Not Collected", "Overflow Bin", "Street Cleaning", "Drain Blockage"],
};

export const mockTickets: Ticket[] = [
  { id: "TKT-2026-001", citizenName: "Rajesh Kumar", citizenId: "C001", department: "Water Supply", issueType: "No Water", description: "No water supply since 2 days in Sector 15", status: "in-progress", priority: "high", assignedOfficer: "Priya Sharma", createdAt: "2026-02-20T10:00:00", updatedAt: "2026-02-21T14:00:00" },
  { id: "TKT-2026-002", citizenName: "Suman Verma", citizenId: "C002", department: "Electricity", issueType: "Power Cut", description: "Frequent power cuts in Block A", status: "open", priority: "medium", createdAt: "2026-02-22T09:30:00", updatedAt: "2026-02-22T09:30:00" },
  { id: "TKT-2026-003", citizenName: "Amit Patel", citizenId: "C003", department: "Waste Management", issueType: "Garbage Not Collected", description: "Garbage not collected for 3 days in Lane 4", status: "assigned", priority: "medium", assignedOfficer: "Ravi Gupta", createdAt: "2026-02-21T08:00:00", updatedAt: "2026-02-22T11:00:00" },
  { id: "TKT-2026-004", citizenName: "Neha Singh", citizenId: "C004", department: "Gas", issueType: "Gas Leak", description: "Gas leak detected near pipeline junction", status: "escalated", priority: "emergency", assignedOfficer: "Mohit Jain", createdAt: "2026-02-23T07:00:00", updatedAt: "2026-02-23T07:30:00" },
  { id: "TKT-2026-005", citizenName: "Rajesh Kumar", citizenId: "C001", department: "Electricity", issueType: "Street Light", description: "Street light not working near park", status: "resolved", priority: "low", assignedOfficer: "Sunita Devi", createdAt: "2026-02-18T16:00:00", updatedAt: "2026-02-20T10:00:00", feedback: { rating: 4, comment: "Good service" } },
  { id: "TKT-2026-006", citizenName: "Kavita Rao", citizenId: "C005", department: "Water Supply", issueType: "Leakage", description: "Water pipeline leaking on main road", status: "in-progress", priority: "high", assignedOfficer: "Priya Sharma", createdAt: "2026-02-22T12:00:00", updatedAt: "2026-02-23T09:00:00" },
];
