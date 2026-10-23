export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  bio?: string | null;
}

export type AuthState = {
  success: boolean;
  message?: string;
  user?: AuthUser;
  errors?: Record<string, string[]>;
};
