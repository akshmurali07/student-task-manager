"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden text-gray-100 bg-gradient-to-b from-[#0a0714] via-[#0d0a1f] to-[#0a0714]">
      {/* Atmospheric glow */}
      <div className="fixed top-[-10%] left-[10%] w-[600px] h-[500px] bg-[#8b5cf6] opacity-[0.12] blur-[160px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[5%] w-[500px] h-[450px] bg-[#22d3ee] opacity-[0.10] blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 min-h-screen flex flex-col">
        {/* Top badge/logo */}
        <div className="flex items-center gap-2 animate-title-in">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] flex items-center justify-center text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            STM
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Academic Productivity
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 grid md:grid-cols-2 gap-12 items-center mt-10">
          {/* Left: title + CTA */}
          <div className="animate-title-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
              Student
              <br />
              Task Manager
            </h1>
            <p className="text-gray-400 mt-5 max-w-md text-sm leading-relaxed">
              Organize assignments, track deadlines, and stay on top of every
              priority — all in one clean, focused workspace built for
              students.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Tasks", "Priorities", "Due Dates"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 mt-9 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] hover:opacity-90 text-white text-sm font-medium rounded-xl px-6 py-3 transition shadow-[0_4px_24px_rgba(139,92,246,0.35)]"
            >
              Go to Dashboard
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Right: floating glass cards */}
          <div className="relative h-[420px] hidden md:block">
            {/* Card 1 - back */}
            <div className="absolute top-4 right-4 w-64 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rotate-[6deg] animate-title-in">
              <p className="text-xs text-gray-500 mb-2">Pending</p>
              <p className="text-2xl font-semibold text-amber-400">3</p>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 rounded-full bg-white/10 w-full"></div>
                <div className="h-1.5 rounded-full bg-white/10 w-2/3"></div>
              </div>
            </div>

            {/* Card 2 - middle */}
            <div className="absolute top-24 right-24 w-72 bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.55)] rotate-[-3deg] animate-title-in">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Assignment Due</p>
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
              </div>
              <p className="text-xs text-gray-500 mb-4">DBMS Lab Report</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee]"></div>
                <p className="text-xs text-gray-500">Due tomorrow</p>
              </div>
            </div>

            {/* Card 3 - front */}
            <div className="absolute top-52 right-8 w-60 bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] rotate-[2deg] animate-title-in">
              <p className="text-xs text-gray-500 mb-2">Completed</p>
              <p className="text-2xl font-semibold text-[#22d3ee]">12</p>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-3 rounded-full bg-gradient-to-t from-[#8b5cf6] to-[#22d3ee] opacity-70"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}