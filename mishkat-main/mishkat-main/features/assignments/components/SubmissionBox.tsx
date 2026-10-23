"use client";

import { useState, useTransition } from "react";
import { FileText, Send, CheckCircle2, Clock, Award, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { submitAssignmentAction } from "../actions/gradeSubmission";
import { AssignmentItem, StudentSubmission } from "../types";

interface SubmissionBoxProps {
  assignment: AssignmentItem;
  existingSubmission?: StudentSubmission | null;
}

export default function SubmissionBox({ assignment, existingSubmission }: SubmissionBoxProps) {
  const [submission, setSubmission] = useState<StudentSubmission | null>(existingSubmission || null);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("assignmentId", assignment.id);

    startTransition(async () => {
      const res = await submitAssignmentAction(formData);
      if (res.success && res.submission) {
        setSubmission(res.submission as any);
        setMessage({ text: "Homework submitted successfully!", isError: false });
      } else {
        setMessage({ text: res.message || "Failed to submit.", isError: true });
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-amber-200/60 p-6 shadow-sm">
      {/* Assignment Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#d97706] bg-amber-50 px-2.5 py-1 rounded-full mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Assignment</span>
          </div>
          <h4 className="text-lg font-bold text-[#0f2b5c]">{assignment.title}</h4>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            Max Score: {assignment.maxScore} pts
          </span>
          {assignment.dueDate && (
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            </span>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap">
        {assignment.instructions}
      </div>

      {/* If Graded, Show Teacher Grade and Feedback */}
      {submission && submission.status === "GRADED" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Grade Received:</span>
            </div>
            <span className="text-xl font-extrabold text-emerald-700">
              {submission.grade} / {assignment.maxScore}
            </span>
          </div>
          {submission.feedback && (
            <div className="mt-2 text-xs flex items-start gap-2 bg-white/70 p-3 rounded-lg border border-emerald-100">
              <MessageSquare className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold block text-slate-800">Teacher Feedback:</span>
                <span className="text-slate-600">{submission.feedback}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
              message.isError
                ? "bg-rose-50 text-rose-800 border border-rose-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            {message.isError ? (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Your Response / Solution:
          </label>
          <textarea
            name="content"
            rows={4}
            defaultValue={submission?.content || ""}
            placeholder="Type your answer, observations, or project summary here..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Project / File Link (GitHub, Google Drive, or Loom video):
          </label>
          <input
            type="url"
            name="fileUrl"
            defaultValue={submission?.fileUrl || ""}
            placeholder="https://..."
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>{submission ? "Resubmit Assignment" : "Submit Assignment"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
