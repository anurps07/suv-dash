import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "citizen" | "officer" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, User> = {
  citizen: { id: "C001", name: "Rajesh Kumar", email: "rajesh@citizen.in", role: "citizen" },
  officer: { id: "O001", name: "Priya Sharma", email: "priya@gov.in", role: "officer", department: "Water Supply" },
  admin: { id: "A001", name: "Vikram Singh", email: "vikram@gov.in", role: "admin" },
  superadmin: { id: "SA001", name: "Anita Desai", email: "anita@gov.in", role: "superadmin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string, role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
