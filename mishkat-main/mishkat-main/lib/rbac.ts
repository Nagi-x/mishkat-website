import { getSession, SessionPayload } from "./session";

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Please log in to perform this action.");
  }
  return session;
}

export async function requireRole(
  allowedRoles: Array<"STUDENT" | "TEACHER" | "ADMIN">
): Promise<SessionPayload> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new Error(
      `Forbidden: Your role (${session.role}) does not have permission for this action.`
    );
  }
  return session;
}

export async function isTeacherOrAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "TEACHER" || session?.role === "ADMIN";
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "ADMIN";
}
