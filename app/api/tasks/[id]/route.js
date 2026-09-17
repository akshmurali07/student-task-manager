import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/Task";
import { getSession } from "@/lib/auth";

// GET a single task
export async function GET(request, { params }) {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const task = await Task.findOne({
    _id: id,
    userId: session.userId,
  });

  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  return Response.json(task);
}

// UPDATE a task
export async function PUT(request, { params }) {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: id,
      userId: session.userId,
    },
    body,
    { new: true }
  );

  if (!updatedTask) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  return Response.json(updatedTask);
}

// DELETE a task
export async function DELETE(request, { params }) {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const deletedTask = await Task.findOneAndDelete({
    _id: id,
    userId: session.userId,
  });

  if (!deletedTask) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  return Response.json({ message: "Task deleted" });
}