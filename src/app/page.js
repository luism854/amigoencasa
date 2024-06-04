import Link from "next/link";

export default function Home() {
  return (
      <>
        <div>
          <h1>Pagina principal</h1>
          <Link href="/login">login</Link>
        </div>
      </>
  );
}
