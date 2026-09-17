import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/Task";

// GET all tasks
export async function GET() {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 });
  return Response.json(tasks);
}

// POST a new task
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const task = await Task.create({
    title: body.title,
    description: body.description || "",
    priority: body.priority || "medium",
    dueDate: body.dueDate || null,
  });
  return Response.json(task, { status: 201 });
}