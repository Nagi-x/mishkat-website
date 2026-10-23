"use server";

import { getSession } from "@/lib/session";

export async function getCurrentUserAction() {
  return await getSession();
}
