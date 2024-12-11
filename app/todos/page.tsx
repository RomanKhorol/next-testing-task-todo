import { redirect } from "next/navigation";
import { getAuthSession } from "../helpers/getAuthSession";
import LogOutBtn from "@/components/LogOutBtn";

export default async function Todos() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>There will be todos</h1>
      <LogOutBtn />
    </div>
  );
}
