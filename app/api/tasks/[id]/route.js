import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/Task";

// GET a single task
export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const task = await Task.findById(id);
  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }
  return Response.json(task);
}

// UPDATE a task
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
  return Response.json(updatedTask);
}

// DELETE a task
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  await Task.findByIdAndDelete(id);
  return Response.json({ message: "Task deleted" });
}