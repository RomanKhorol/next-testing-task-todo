import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function ToDo({ params: { id } }: Props) {
  return (
    <div>
      <Link href="/todos">Back to ToDo list</Link>
      <h1>Page {id}</h1>
    </div>
  );
}
