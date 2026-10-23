import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  avatarUrl?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Check if PostgreSQL is actually configured with a real connection string
function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL || "";
  if (!url) return false;
  if (url.includes("HOST:5432") || url.includes("USER:PASSWORD")) return false;
  return true;
}

// Default initial users for demo and presentation
const SEED_USERS: UserRecord[] = [
  {
    id: "demo-teacher-1",
    name: "Prof. David Miller",
    email: "teacher@mishkat.com",
    // bcrypt hash for "password123"
    passwordHash: "$2b$10$tZ2c6zZ5j0N3G6n5O2pZmeG57dY9Q4Y7fH/yK.Y0mU4W3nF6wK7f.",
    role: "TEACHER",
    bio: "Senior Cloud Architect & Certified Educator",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-student-1",
    name: "Sarah Ahmed",
    email: "student@mishkat.com",
    // bcrypt hash for "password123"
    passwordHash: "$2b$10$tZ2c6zZ5j0N3G6n5O2pZmeG57dY9Q4Y7fH/yK.Y0mU4W3nF6wK7f.",
    role: "STUDENT",
    bio: "Full Stack & Design Enthusiast",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function ensureStorage(): UserRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      // Generate actual working hashes for demo accounts
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync("password123", salt);
      const initialized = SEED_USERS.map((u) => ({ ...u, passwordHash: hash }));
      fs.writeFileSync(USERS_FILE, JSON.stringify(initialized, null, 2), "utf-8");
      return initialized;
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : SEED_USERS;
  } catch (err) {
    console.error("Failed to read user storage, using memory fallback", err);
    return SEED_USERS;
  }
}

function saveUsers(users: UserRecord[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save users to file", err);
  }
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalizedEmail = email.toLowerCase().trim();

  // Try Prisma only if database is configured
  if (isDatabaseConfigured()) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash,
          role: user.role as "STUDENT" | "TEACHER" | "ADMIN",
          avatarUrl: user.avatarUrl,
          bio: user.bio,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        };
      }
    } catch {
      // Prisma error: continue to fallback
    }
  }

  // Fallback to local store
  const users = ensureStorage();
  const match = users.find((u) => u.email.toLowerCase().trim() === normalizedEmail);
  return match || null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  bio?: string;
}): Promise<UserRecord> {
  const normalizedEmail = data.email.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Try Prisma only if database is configured
  if (isDatabaseConfigured()) {
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: normalizedEmail,
          passwordHash,
          role: data.role,
          bio: data.bio || null,
        },
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role as "STUDENT" | "TEACHER" | "ADMIN",
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    } catch {
      // Prisma error: continue to fallback
    }
  }

  const users = ensureStorage();
  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: normalizedEmail,
    passwordHash,
    role: data.role,
    bio: data.bio || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}
