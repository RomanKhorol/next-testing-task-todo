import { revalidateTag } from "next/cache";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
export async function GET() {
  revalidateTag("tasks");

  const tasksCollection = collection(db, "tasks");
  const snapshot = await getDocs(tasksCollection);
  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();
  const tasksCollection = collection(db, "tasks");
  const newTask = {
    title: data.title,
    description: data.description,
    timestamp: serverTimestamp(),
  };
  const docRef = await addDoc(tasksCollection, newTask);
  revalidateTag("tasks");
  return new Response(JSON.stringify({ id: docRef.id, ...newTask }), {
    status: 201,
  });
}
