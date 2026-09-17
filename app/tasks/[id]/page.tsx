"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const priorityStyles = {
  low: "text-slate-400 border-slate-400/30 bg-slate-400/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  high: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export default function TaskDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  async function fetchTask() {
    setLoading(true);
    const res = await fetch(`/api/tasks/${id}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setTask(data);
    setTitle(data.title);
    setDescription(data.description || "");
    setPriority(data.priority || "medium");
    setDueDate(data.dueDate ? data.dueDate.slice(0, 10) : "");
    setLoading(false);
  }

  async function saveChanges(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority, dueDate: dueDate || null }),
    });

    fetchTask();
  }

  async function toggleComplete() {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTask();
  }

  async function deleteTask() {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0714] text-gray-500 text-sm">
        Loading task...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0a0714] text-gray-400">
        <p className="text-sm">Task not found.</p>
        <Link href="/" className="text-sm text-[#22d3ee] hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-gray-100 bg-gradient-to-b from-[#0a0714] via-[#0d0a1f] to-[#0a0714]">
      <div className="fixed top-[-10%] left-[10%] w-[600px] h-[500px] bg-[#8b5cf6] opacity-[0.10] blur-[160px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[5%] w-[500px] h-[450px] bg-[#22d3ee] opacity-[0.08] blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition mb-6"
        >
          ← Back to dashboard
        </Link>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${priorityStyles[(task.priority || "medium") as keyof typeof priorityStyles]}`}
            >
              {task.priority || "medium"} priority
            </span>
            <button
              onClick={toggleComplete}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                task.completed
                  ? "text-[#22d3ee] border-[#22d3ee]/30 bg-[#22d3ee]/10"
                  : "text-gray-400 border-white/[0.12] hover:border-white/25"
              }`}
            >
              {task.completed ? "Completed" : "Mark complete"}
            </button>
          </div>

          <form onSubmit={saveChanges} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/30 transition"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/30 transition resize-none"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1.5">Priority</label>
                <select
                  value={priority}
                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)}
                  className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1.5">Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                  className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 transition [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={deleteTask}
                className="flex-1 bg-black/20 border border-red-400/20 hover:border-red-400/40 text-red-400 text-sm font-medium rounded-xl py-2.5 transition"
              >
                Delete task
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] hover:opacity-90 text-white text-sm font-medium rounded-xl py-2.5 transition shadow-[0_4px_24px_rgba(139,92,246,0.3)]"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}