"use client";

import { useState, useEffect, useTransition } from "react";
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  School,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { loginAction } from "../actions/login";
import { registerAction } from "../actions/register";
import { AuthState } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
  initialRole?: "STUDENT" | "TEACHER";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  initialRole = "STUDENT",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"STUDENT" | "TEACHER">(initialRole);
  const [state, setState] = useState<AuthState | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMode(initialMode);
    setRole(initialRole);
    setState(null);
  }, [initialMode, initialRole, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("role", role);

    startTransition(async () => {
      let result: AuthState;
      if (mode === "login") {
        result = await loginAction(null, formData);
      } else {
        result = await registerAction(null, formData);
      }

      setState(result);

      if (result.success) {
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 900);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header decoration */}
        <div className="bg-gradient-to-br from-[#0b192e] via-[#0f2b5c] to-[#1e40af] p-6 text-white text-center relative border-b border-amber-400/20">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-slate-300 hover:text-white transition p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 mb-2 border border-amber-400/30 shadow-inner">
            {mode === "login" ? (
              <Lock className="w-6 h-6" />
            ) : role === "TEACHER" ? (
              <School className="w-6 h-6" />
            ) : (
              <GraduationCap className="w-6 h-6" />
            )}
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            {mode === "login"
              ? "Welcome Back to Mishkat"
              : role === "TEACHER"
              ? "Teacher & Educator Sign-Up"
              : "Student Registration"}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            {mode === "login"
              ? "Sign in to access your courses, progress, assignments, and dashboard."
              : role === "TEACHER"
              ? "Create your teacher account to publish interactive courses and mentor learners."
              : "Create your student account to enroll in world-class courses and earn certifications."}
          </p>

          {/* Toggle buttons between Login and Register */}
          <div className="flex bg-slate-900/70 p-1 rounded-xl mt-4 border border-white/10 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setState(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                mode === "login"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setState(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                mode === "register"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              REGISTER
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Notification Message */}
          {state?.message && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 font-medium animate-in fade-in ${
                state.success
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {state.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              )}
              <span>{state.message}</span>
            </div>
          )}

          {/* Role selector for registration */}
          {mode === "register" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Select Account Type:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    role === "STUDENT"
                      ? "border-amber-500 bg-amber-50/70 text-[#0f2b5c] ring-2 ring-amber-400/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <GraduationCap
                      className={`w-5 h-5 ${
                        role === "STUDENT" ? "text-[#d97706]" : "text-slate-400"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        role === "STUDENT"
                          ? "bg-amber-200 text-amber-900"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      Learner
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Student Sign-Up</span>
                    <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">
                      Enroll in courses, submit projects & gain certificates
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("TEACHER")}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    role === "TEACHER"
                      ? "border-amber-500 bg-amber-50/70 text-[#0f2b5c] ring-2 ring-amber-400/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <School
                      className={`w-5 h-5 ${
                        role === "TEACHER" ? "text-[#d97706]" : "text-slate-400"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        role === "TEACHER"
                          ? "bg-amber-200 text-amber-900"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      Educator
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Teacher Sign-Up</span>
                    <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">
                      Publish courses, review students & manage classroom
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Name Field (Register only) */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {role === "TEACHER" ? "Full Name & Academic Title" : "Full Name"}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={role === "TEACHER" ? "e.g. Prof. David Miller" : "e.g. Sarah Ahmed"}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                />
              </div>
              {state?.errors?.name && (
                <p className="text-[11px] text-rose-600 mt-1">{state.errors.name[0]}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                required
                placeholder={role === "TEACHER" && mode === "register" ? "educator@mishkat.com" : "student@mishkat.com"}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-[11px] text-rose-600 mt-1">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              {mode === "login" && (
                <span className="text-[11px] text-amber-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              />
            </div>
            {state?.errors?.password && (
              <p className="text-[11px] text-rose-600 mt-1">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Demo account quick fill pill */}
          {mode === "login" && (
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="text-[11px]">Demo account:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                    const passInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                    if (emailInput && passInput) {
                      emailInput.value = "student@mishkat.com";
                      passInput.value = "password123";
                    }
                  }}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
                >
                  Student
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                    const passInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                    if (emailInput && passInput) {
                      emailInput.value = "teacher@mishkat.com";
                      passInput.value = "password123";
                    }
                  }}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
                >
                  Teacher
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === "login" ? (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : role === "TEACHER" ? (
              <>
                <School className="w-4 h-4" />
                <span>Complete Teacher Registration</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4" />
                <span>Complete Student Registration</span>
              </>
            )}
          </button>

          {/* Footer note */}
          <p className="text-[11px] text-center text-slate-400 pt-1">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Sign in instead
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
