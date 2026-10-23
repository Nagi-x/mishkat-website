import { z } from "zod";

export const createAssignmentSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  instructions: z.string().min(10, "Instructions must be at least 10 characters long"),
  maxScore: z.coerce.number().min(1).max(1000).default(100),
  dueDate: z.string().optional(),
});

export const submitAssignmentSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  content: z.string().optional(),
  fileUrl: z.string().url("Must be a valid URL/link").optional().or(z.literal("")),
});

export const gradeSubmissionSchema = z.object({
  submissionId: z.string().min(1, "Submission ID is required"),
  grade: z.coerce.number().min(0, "Grade cannot be negative"),
  feedback: z.string().optional(),
  status: z.enum(["GRADED", "RESUBMIT_REQUESTED"]).default("GRADED"),
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
export type SubmitAssignmentInput = z.infer<typeof submitAssignmentSchema>;
export type GradeSubmissionInput = z.infer<typeof gradeSubmissionSchema>;
