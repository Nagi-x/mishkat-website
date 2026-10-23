# Database Architecture & Integration Guide

Production-ready technical documentation for the PostgreSQL database integration with Prisma ORM in the **Mishkat** Next.js platform.

---

## 1. Overview & Stack Specifications

| Component | Technology | Version / Specification |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `16.x` / React `19.x` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` |
| **Database System** | [PostgreSQL](https://www.postgresql.org/) | `14+` |
| **ORM / Query Builder** | [Prisma](https://www.prisma.io/) | `^6.19.3` |
| **Prisma Engine / Client** | `@prisma/client` | `^6.19.3` |
| **Schema Definition** | [prisma/schema.prisma](file:///c:/Users/zixnu/Documents/GitHub/mishkat/prisma/schema.prisma) | Relational PostgreSQL Schema |
| **Database Client Singleton**| [lib/prisma.ts](file:///c:/Users/zixnu/Documents/GitHub/mishkat/lib/prisma.ts) | Node `globalThis` cached instance |
| **Seed Runner** | [prisma/seed.ts](file:///c:/Users/zixnu/Documents/GitHub/mishkat/prisma/seed.ts) via `tsx` | Automated test & demo fixtures |

---

## 2. Environment Setup

### 2.1 Configuration File (`.env`)

Prisma and Next.js read database connection settings from the root `.env` file via the `DATABASE_URL` environment variable.

Create or update `.env` in the project root:

```env
# Database Connection String
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/mishkat_db?schema=public"
```

### 2.2 Connection String Anatomy

The PostgreSQL URI follows the standard RFC 3986 format:

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA&sslmode=MODE
   │          │      │       │    │      │             │            │
   │          │      │       │    │      │             │            └─ SSL requirement
   │          │      │       │    │      │             └─ Target schema (default: public)
   │          │      │       │    │      └─ Database name
   │          │      │       │    └─ Port (default: 5432)
   │          │      │       └─ Database Host (IP or hostname)
   │          │      └─ User password (URL-encoded if special chars)
   │          └─ Database username
   └─ Protocol identifier
```

#### Parameter Breakdown

* **`USER`**: Database role name (e.g., `postgres`).
* **`PASSWORD`**: Password for the user. If your password contains special characters (`@`, `:`, `/`, `#`), they **must** be URL-encoded (e.g., `@` becomes `%40`).
* **`HOST`**: Hostname or IP address (e.g., `localhost`, `127.0.0.1`, or cloud host `aws.connect.psdb.cloud`).
* **`PORT`**: PostgreSQL listen port (standard is `5432`).
* **`DATABASE`**: Name of the database instance (e.g., `mishkat_db`).
* **`schema=public`**: PostgreSQL schema namespace used for tables. Default is `public`.
* **`sslmode=require` / `sslmode=prefer`**: SSL encryption parameter for production cloud providers.

### 2.3 Cloud Providers & Connection Pooling Examples

#### Local PostgreSQL (Docker / Native)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mishkat_db?schema=public"
```

#### Supabase
```env
# Pooled connection string (Transaction mode, port 6543)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

# Direct connection string for Prisma migrations (Session mode, port 5432)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### Neon Serverless Postgres
```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[ENDPOINT].neon.tech/mishkat_db?sslmode=require"
```

### 2.4 Security & Secrets Management
* **Do not commit `.env`**: Verify `.env` is listed in your [.gitignore](file:///c:/Users/zixnu/Documents/GitHub/mishkat/.gitignore).
* **Client Isolation**: Never prefix `DATABASE_URL` with `NEXT_PUBLIC_`. Keep database credentials strictly server-side.

---

## 3. Database Initialization & CLI Operations

All Prisma CLI scripts are managed through `npx prisma` or scripts defined in [package.json](file:///c:/Users/zixnu/Documents/GitHub/mishkat/package.json).

### 3.1 Initial Setup Workflow

When cloning or setting up a fresh development workspace:

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client TypeScript types
npx prisma generate

# 3. Create schema & apply migrations to local PostgreSQL
npx prisma migrate dev --name init

# 4. Seed initial users, sample courses, and curriculum
npx prisma db seed
```

---

### 3.2 Migration Commands Reference

| Command | Environment | Purpose |
| :--- | :--- | :--- |
| `npx prisma generate` | Dev / CI / Build | Reads [schema.prisma](file:///c:/Users/zixnu/Documents/GitHub/mishkat/prisma/schema.prisma) and compiles `@prisma/client` types. |
| `npx prisma migrate dev --name <migration_name>` | Development | Creates a new SQL migration file, executes it, and regenerates Prisma Client. |
| `npx prisma migrate deploy` | Production / Staging | Applies pending migrations in order without prompting. Recommended for CI/CD. |
| `npx prisma db push` | Prototyping | Syncs the database schema with `schema.prisma` without creating migration SQL files. |
| `npx prisma migrate reset` | Development Only | Drops the database, applies all migrations from scratch, and runs the seed script. |
| `npx prisma db seed` | Dev / Staging | Executes the seed script defined in `package.json` (`tsx prisma/seed.ts`). |
| `npx prisma studio` | Development | Opens a web-based GUI at `http://localhost:5555` to view and edit database rows. |
| `npx prisma validate` | Dev / CI | Verifies that the Prisma schema is syntactically correct. |
| `npx prisma format` | Development | Formats the Prisma schema file automatically. |

---

### 3.3 Database Seeding Details

Seeding is registered in [package.json](file:///c:/Users/zixnu/Documents/GitHub/mishkat/package.json#L37-L39):

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

Running `npx prisma db seed` populates the database with default test accounts and sample content:

| Entity | Default Credentials / Data | Role / Details |
| :--- | :--- | :--- |
| **Teacher Account** | `teacher@mishkat.com` / `Password123!` | Role: `TEACHER` (Dr. Tariq Al-Mansoor) |
| **Student Account** | `student@mishkat.com` / `Password123!` | Role: `STUDENT` (Sami Benali) |
| **Courses** | *Full-Stack Web Development*, *UI/UX Design* | Bilingual titles, sections, lessons, preview videos |
| **Assessments** | Weekly assignments & mock submissions | Sample grading, feedback, and student notes |

> [!WARNING]
> The seed script in [prisma/seed.ts](file:///c:/Users/zixnu/Documents/GitHub/mishkat/prisma/seed.ts#L10-L17) deletes all existing records in reverse relation order before creating new fixtures. Do not run `npx prisma db seed` against a live production database with user data.

---

## 4. Data Architecture & Entity Relationship

The Mishkat data layer is organized around an educational LMS domain: Users, Courses, Sections, Lessons, Assignments, Submissions, Enrollments, and Reviews.

### 4.1 Mermaid Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ Course : "teaches (TeacherCourses)"
    User ||--o{ Enrollment : "enrolls in"
    User ||--o{ Submission : "submits"
    User ||--o{ Review : "writes"

    Course ||--o{ Section : "contains"
    Course ||--o{ Enrollment : "has students"
    Course ||--o{ Review : "receives"

    Section ||--o{ Lesson : "contains"
    Lesson ||--o{ Assignment : "contains"
    Assignment ||--o{ Submission : "receives"

    User {
        string id PK "cuid()"
        string name
        string email UK
        string passwordHash
        Role role "STUDENT | TEACHER | ADMIN"
        string avatarUrl "nullable"
        string bio "nullable"
        DateTime createdAt
        DateTime updatedAt
    }

    Course {
        string id PK "cuid()"
        string title
        string titleAr "nullable"
        string slug UK
        string description
        decimal price "default 0.0"
        string category
        string categoryAr "nullable"
        string thumbnailUrl "nullable"
        CourseStatus status "DRAFT | PUBLISHED | ARCHIVED"
        string teacherId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Section {
        string id PK "cuid()"
        string title
        string titleAr "nullable"
        int orderIndex
        string courseId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Lesson {
        string id PK "cuid()"
        string title
        string titleAr "nullable"
        int durationMinutes "default 0"
        string videoUrl "nullable"
        string content "nullable"
        int orderIndex "default 0"
        boolean isPreview "default false"
        string sectionId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Assignment {
        string id PK "cuid()"
        string title
        string titleAr "nullable"
        string instructions
        int maxScore "default 100"
        DateTime dueDate "nullable"
        string lessonId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Submission {
        string id PK "cuid()"
        string assignmentId FK
        string studentId FK
        string content "nullable"
        string fileUrl "nullable"
        float grade "nullable"
        string feedback "nullable"
        SubmissionStatus status "SUBMITTED | GRADED | RESUBMIT_REQUESTED"
        DateTime submittedAt
        DateTime gradedAt "nullable"
    }

    Enrollment {
        string id PK "cuid()"
        string userId FK
        string courseId FK
        float progressPercentage "default 0.0"
        string_array completedLessonIds "default []"
        boolean isCompleted "default false"
        DateTime enrolledAt
        DateTime updatedAt
    }

    Review {
        string id PK "cuid()"
        int rating "1 to 5"
        string comment "nullable"
        string userId FK
        string courseId FK
        DateTime createdAt
    }
```

---

### 4.2 Enumerations

#### `Role`
* `STUDENT` – Default role for enrolled learners.
* `TEACHER` – Instructors capable of authoring courses and grading homework.
* `ADMIN` – Platform administrators with full system governance.

#### `CourseStatus`
* `DRAFT` – Work in progress, not visible to students.
* `PUBLISHED` – Active course available for enrollment.
* `ARCHIVED` – Inactive or retired course.

#### `SubmissionStatus`
* `SUBMITTED` – Homework turned in by student, pending review.
* `GRADED` – Graded by teacher with score and feedback.
* `RESUBMIT_REQUESTED` – Teacher requested revisions from student.

---

### 4.3 Data Dictionary & Relational Tables

#### 1. `User` Table
Stores user credentials, profiles, and role classifications.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique user identifier. |
| `name` | `String` | Required | Full display name. |
| `email` | `String` | `@unique`, `Indexed` | Primary email address for login. |
| `passwordHash` | `String` | Required | Bcrypt-hashed password. |
| `role` | `Role` | `@default(STUDENT)` | User role (`STUDENT`, `TEACHER`, `ADMIN`). |
| `avatarUrl` | `String?` | Optional | Profile image URL. |
| `bio` | `String?` | Optional | Biography or instructor credentials. |
| `createdAt` | `DateTime` | `@default(now())` | Registration timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Profile update timestamp. |

#### 2. `Course` Table
Main catalog item created and managed by an instructor.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique course identifier. |
| `title` | `String` | Required | Course title (English / Primary). |
| `titleAr` | `String?` | Optional | Course title (Arabic localization). |
| `slug` | `String` | `@unique` | URL-friendly unique identifier. |
| `description` | `String` | Required | Full course syllabus overview. |
| `price` | `Decimal` | `@default(0.0)` | Enrollment fee (0.0 = Free). |
| `category` | `String` | Required, `Indexed` | Primary category (e.g. `Development`). |
| `categoryAr` | `String?` | Optional | Category in Arabic. |
| `thumbnailUrl` | `String?` | Optional | Cover thumbnail image path. |
| `status` | `CourseStatus`| `@default(DRAFT)`, `Indexed` | Lifecycle state (`DRAFT`, `PUBLISHED`, `ARCHIVED`). |
| `teacherId` | `String` | Foreign Key `User.id`, `Cascade` | Instructor responsible for the course. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Modification timestamp. |

#### 3. `Section` Table
Curriculum groupings organizing lessons sequentially within a course.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique section identifier. |
| `title` | `String` | Required | Section module title. |
| `titleAr` | `String?` | Optional | Section title (Arabic). |
| `orderIndex` | `Int` | Required | Sequence index within the course. |
| `courseId` | `String` | Foreign Key `Course.id`, `Cascade`, `Indexed` | Parent course reference. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Update timestamp. |

#### 4. `Lesson` Table
Individual learning units (videos, articles, notes).

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique lesson identifier. |
| `title` | `String` | Required | Lesson title. |
| `titleAr` | `String?` | Optional | Lesson title (Arabic). |
| `durationMinutes` | `Int` | `@default(0)` | Video or estimated reading length. |
| `videoUrl` | `String?` | Optional | Hosted video URL / stream link. |
| `content` | `String?` | Optional | Rich text / markdown lesson body. |
| `orderIndex` | `Int` | `@default(0)` | Sequence ordering inside section. |
| `isPreview` | `Boolean` | `@default(false)` | Flag indicating if lesson is publicly viewable for free. |
| `sectionId` | `String` | Foreign Key `Section.id`, `Cascade`, `Indexed` | Parent section reference. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Modification timestamp. |

#### 5. `Assignment` Table
Tasks, homework, or coding challenges attached to specific lessons.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique assignment identifier. |
| `title` | `String` | Required | Assignment title. |
| `titleAr` | `String?` | Optional | Assignment title (Arabic). |
| `instructions` | `String` | Required | Detailed grading rubrics & guidance. |
| `maxScore` | `Int` | `@default(100)` | Maximum possible points. |
| `dueDate` | `DateTime?` | Optional | Submission deadline timestamp. |
| `lessonId` | `String` | Foreign Key `Lesson.id`, `Cascade`, `Indexed` | Parent lesson reference. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Modification timestamp. |

#### 6. `Submission` Table
Student responses and grading feedback for assignments.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique submission identifier. |
| `assignmentId` | `String` | Foreign Key `Assignment.id`, `Cascade`, `Indexed` | Assignment target. |
| `studentId` | `String` | Foreign Key `User.id`, `Cascade`, `Indexed` | Student who submitted. |
| `content` | `String?` | Optional | Text notes or response content. |
| `fileUrl` | `String?` | Optional | Uploaded homework file URL. |
| `grade` | `Float?` | Optional | Assigned numeric score. |
| `feedback` | `String?` | Optional | Teacher comments / review notes. |
| `status` | `SubmissionStatus` | `@default(SUBMITTED)` | Submission review lifecycle state. |
| `submittedAt` | `DateTime` | `@default(now())` | Submission timestamp. |
| `gradedAt` | `DateTime?` | Optional | Timestamp when evaluation was finalized. |

#### 7. `Enrollment` Table
Represents learner enrollment in a course and tracks progress.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique enrollment record. |
| `userId` | `String` | Foreign Key `User.id`, `Cascade`, `Indexed` | Enrolled learner. |
| `courseId` | `String` | Foreign Key `Course.id`, `Cascade`, `Indexed` | Enrolled course. |
| `progressPercentage` | `Float` | `@default(0.0)` | Calculated progress (0.0 to 100.0). |
| `completedLessonIds`| `String[]` | `@default([])` | Array of completed `Lesson.id` strings. |
| `isCompleted` | `Boolean` | `@default(false)` | Flag marking course completion. |
| `enrolledAt` | `DateTime` | `@default(now())` | Enrollment date. |
| `updatedAt` | `DateTime` | `@updatedAt` | Last activity update timestamp. |
| *Composite Unique* | `[userId, courseId]` | `@unique` | Guarantees a student can only enroll once per course. |

#### 8. `Review` Table
Course ratings and text feedback from enrolled students.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(cuid())` | Unique review identifier. |
| `rating` | `Int` | Required (1 to 5) | Star rating scale. |
| `comment` | `String?` | Optional | Review feedback body. |
| `userId` | `String` | Foreign Key `User.id`, `Cascade` | Author of the review. |
| `courseId` | `String` | Foreign Key `Course.id`, `Cascade`, `Indexed` | Target course. |
| `createdAt` | `DateTime` | `@default(now())` | Review submission timestamp. |
| *Composite Unique* | `[userId, courseId]` | `@unique` | Limits each student to one review per course. |

---

### 4.4 Referential Integrity & Cascade Behavior

Every foreign key relationship in the schema is configured with `onDelete: Cascade`:
* Deleting a **`Course`** removes all child `Section`s, `Lesson`s, `Assignment`s, `Submission`s, `Enrollment`s, and `Review`s.
* Deleting a **`User`** removes their authored courses, enrollments, submissions, and reviews.
* Deleting a **`Section`** removes its child `Lesson`s and associated `Assignment`s.

---

## 5. Application Integration & Code Examples

### 5.1 Prisma Client Singleton (`lib/prisma.ts`)

In Next.js development mode, Hot Module Replacement (HMR) re-evaluates modules on file changes. Creating `new PrismaClient()` on every rebuild quickly exhausts PostgreSQL's connection pool.

The project handles this via the singleton pattern in [lib/prisma.ts](file:///c:/Users/zixnu/Documents/GitHub/mishkat/lib/prisma.ts):

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

---

### 5.2 Basic Query: Fetching User by Email

```typescript
import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase().trim(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  return user;
}
```

---

### 5.3 Relational Query: Fetching Course with Nested Curriculum

Fetch a published course along with its instructor, structured sections, ordered lessons, and average rating:

```typescript
import { prisma } from "@/lib/prisma";

export async function getCourseWithCurriculum(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          bio: true,
        },
      },
      sections: {
        orderBy: { orderIndex: "asc" },
        include: {
          lessons: {
            orderBy: { orderIndex: "asc" },
            select: {
              id: true,
              title: true,
              titleAr: true,
              durationMinutes: true,
              isPreview: true,
              assignments: {
                select: {
                  id: true,
                  title: true,
                  maxScore: true,
                },
              },
            },
          },
        },
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
          user: {
            select: { name: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return course;
}
```

---

### 5.4 Transactional Mutation: Enrolling a Student in a Course

Atomic database transaction ensuring enrollment creation occurs cleanly:

```typescript
import { prisma } from "@/lib/prisma";

export async function enrollStudent(userId: string, courseId: string) {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify course is published
    const course = await tx.course.findUnique({
      where: { id: courseId },
      select: { id: true, status: true },
    });

    if (!course || course.status !== "PUBLISHED") {
      throw new Error("Course is not available for enrollment.");
    }

    // 2. Check if student is already enrolled
    const existingEnrollment = await tx.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existingEnrollment) {
      return existingEnrollment;
    }

    // 3. Create enrollment record
    return await tx.enrollment.create({
      data: {
        userId,
        courseId,
        progressPercentage: 0.0,
        completedLessonIds: [],
        isCompleted: false,
      },
    });
  });
}
```

---

### 5.5 Progress Update: Marking a Lesson as Complete

```typescript
import { prisma } from "@/lib/prisma";

export async function markLessonComplete(userId: string, courseId: string, lessonId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });

  if (!enrollment) {
    throw new Error("Enrollment not found.");
  }

  // Count total lessons in course to calculate exact percentage
  const totalLessons = await prisma.lesson.count({
    where: { section: { courseId } },
  });

  const updatedCompleted = Array.from(new Set([...enrollment.completedLessonIds, lessonId]));
  const progressPercentage = totalLessons > 0 
    ? Math.min(100, Math.round((updatedCompleted.length / totalLessons) * 100))
    : 100;

  return await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: {
      completedLessonIds: updatedCompleted,
      progressPercentage,
      isCompleted: progressPercentage >= 100,
    },
  });
}
```

---

## 6. Production Best Practices & Verification

### 6.1 Database Connection Health Check Route

To verify connectivity from a Next.js Server Component or Route Handler (`app/api/health/db/route.ts`):

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Executes a lightweight ping query
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "healthy", database: "connected" }, { status: 200 });
  } catch (error) {
    console.error("Database healthcheck failed:", error);
    return NextResponse.json(
      { status: "unhealthy", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
```

### 6.2 Connection Pool Sizing for Serverless Deployments

When deploying Next.js on Vercel, AWS Lambda, or other serverless platforms:
1. Each serverless function container may open its own database connection.
2. Direct connections can rapidly saturate PostgreSQL's `max_connections` limit.
3. **Recommendation**:
   * Use a connection pooler such as **PgBouncer**, **Supabase Connection Pooler**, or **Neon Pooling**.
   * Add `connection_limit=1` or `pgbouncer=true` to your query connection string.
   * Maintain a `DIRECT_URL` pointing to port `5432` for running migrations in CI/CD.
