import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/Task";
import { getSession } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await Task.find({ userId: session.userId }).sort({
    createdAt: -1,
  });

  return Response.json(tasks);
}

export async function POST(request) {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const task = await Task.create({
    title: body.title,
    description: body.description || "",
    priority: body.priority || "medium",
    dueDate: body.dueDate || null,
    userId: session.userId,
  });

  return Response.json(task, { status: 201 });
}