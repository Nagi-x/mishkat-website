"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUserAction } from "@/features/auth/actions/getCurrentUser";
import { logoutAction } from "@/features/auth/actions/login";
import { SessionPayload } from "@/lib/session";
import AuthModal from "@/features/auth/components/AuthModal";

interface AuthContextType {
  user: SessionPayload | null;
  isLoading: boolean;
  openAuthModal: (mode?: "login" | "register", role?: "STUDENT" | "TEACHER") => void;
  closeAuthModal: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");
  const [modalRole, setModalRole] = useState<"STUDENT" | "TEACHER">("STUDENT");

  const refreshUser = async () => {
    try {
      const current = await getCurrentUserAction();
      setUser(current);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const openAuthModal = (
    mode: "login" | "register" = "login",
    role: "STUDENT" | "TEACHER" = "STUDENT"
  ) => {
    setModalMode(mode);
    setModalRole(role);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    refreshUser();
  };

  const logout = async () => {
    await logoutAction();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        openAuthModal,
        closeAuthModal,
        logout,
        refreshUser,
      }}
    >
      {children}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeAuthModal}
        initialMode={modalMode}
        initialRole={modalRole}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
