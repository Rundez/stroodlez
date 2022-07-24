import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Users: NextPage = () => {
  const { data } = trpc.useQuery(["example.getAll"]);
  const { data: session, status } = useSession();

  console.log(data);
  console.log(session);
  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <div className="flex flex-col">Users here</div>
      </main>
    </>
  );
};

export default Users;
