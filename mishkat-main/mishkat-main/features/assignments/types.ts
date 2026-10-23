export type SubmissionStatus = "SUBMITTED" | "GRADED" | "RESUBMIT_REQUESTED";

export interface AssignmentItem {
  id: string;
  title: string;
  titleAr?: string | null;
  instructions: string;
  maxScore: number;
  dueDate?: Date | null;
  lessonId: string;
  submissionsCount?: number;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  content?: string | null;
  fileUrl?: string | null;
  grade?: number | null;
  feedback?: string | null;
  status: SubmissionStatus;
  submittedAt: Date;
  gradedAt?: Date | null;
}
