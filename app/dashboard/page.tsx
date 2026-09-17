"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
async function handleLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}
import Link from "next/link";

const priorityStyles: Record<string, { dot: string; text: string }> = {
  low: { dot: "bg-slate-400", text: "text-slate-400" },
  medium: { dot: "bg-amber-400", text: "text-amber-400" },
  high: { dot: "bg-rose-400", text: "text-rose-400" },
};

export default function Dashboard() {
const router = useRouter();

useEffect(() => {
  fetch("/api/auth/session")
    .then((res) => {
      if (!res.ok) {
        router.push("/login");
      }
    });
}, [router]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority, dueDate: dueDate || null }),
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    fetchTasks();
  }

  async function toggleComplete(id: string, completed: boolean, e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  }

  async function deleteTask(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen relative text-gray-100 bg-gradient-to-b from-[#0a0714] via-[#0d0a1f] to-[#0a0714]">
      {/* Atmospheric glow */}
      <div className="fixed top-[-10%] left-[10%] w-[600px] h-[500px] bg-[#8b5cf6] opacity-[0.10] blur-[160px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[5%] w-[500px] h-[450px] bg-[#22d3ee] opacity-[0.08] blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight animate-title-in bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
              Student Task Manager
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Stay on top of your academic tasks
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] flex items-center justify-center text-sm font-bold shadow-[0_0_24px_rgba(139,92,246,0.4)]">
            STM
          </div>
<button
  onClick={handleLogout}
  className="text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl px-4 py-2 transition"
>
  Logout
</button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="text-sm text-gray-500 mb-1">Total tasks</p>
            <p className="text-3xl font-semibold text-white">{totalCount}</p>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-3xl font-semibold text-amber-400">{pendingCount}</p>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-semibold text-[#22d3ee]">{completedCount}</p>
          </div>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 mb-8 space-y-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/30 transition"
          />
          <input
            type="text"
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/30 transition"
          />
          <div className="flex gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 transition"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="flex-1 bg-black/20 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#8b5cf6]/50 transition [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] hover:opacity-90 text-white text-sm font-medium rounded-xl py-2.5 transition shadow-[0_4px_24px_rgba(139,92,246,0.3)]"
          >
            Add Task
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition ${
                filter === f
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-transparent text-gray-500 border border-white/[0.06] hover:text-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/[0.08] rounded-2xl">
            <p className="text-gray-500 text-sm">No tasks here yet.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTasks.map((task) => {
              const p = priorityStyles[task.priority || "medium"];
              return (
                <div
                  key={task._id}
                  className="group bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 hover:border-white/[0.18] hover:bg-white/[0.05] transition shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleComplete(task._id, task.completed, e)}
                        className="mt-1 w-4 h-4 accent-[#22d3ee] cursor-pointer shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`}></span>
                          <p
                            className={`text-sm font-medium truncate ${
                              task.completed ? "line-through text-gray-500" : "text-gray-100"
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-1 truncate">{task.description}</p>
                        )}
                        {task.dueDate && (
                          <p className="text-xs text-gray-600 mt-1">
                            Due {new Date(task.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 opacity-70 group-hover:opacity-100 transition">
                      <Link
                        href={`/tasks/${task._id}`}
                        className="text-xs font-medium text-[#22d3ee] hover:text-[#67e8f9]"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => deleteTask(task._id, e)}
                        className="text-xs font-medium text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}