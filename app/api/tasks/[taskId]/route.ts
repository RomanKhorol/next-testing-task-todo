import { revalidateTag } from "next/cache";
import { db } from "../../../lib/firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  if (!taskId)
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
    });
  revalidateTag("tasks");
  const taskDocRef = doc(db, "tasks", taskId);
  const taskSnapshot = await getDoc(taskDocRef);

  if (!taskSnapshot.exists()) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({ id: taskSnapshot.id, ...taskSnapshot.data() }),
    { status: 200 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  if (!taskId)
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
    });

  const todoDocRef = doc(db, "tasks", taskId);

  await deleteDoc(todoDocRef);
  await revalidateTag("tasks");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  const data = await req.json();

  if (!taskId)
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
    });

  const todoDocRef = doc(db, "tasks", taskId);

  await updateDoc(todoDocRef, {
    title: data.title,
    description: data.description,
  });
  await revalidateTag("tasks");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
