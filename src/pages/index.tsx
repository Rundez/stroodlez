import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { DeckAlgo } from "../components/deck-algo";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session, status } = useSession();
  const { data: leaderbord } = trpc.useQuery(["leaderboard.getLeaderboard"]);

  console.log(leaderbord);
  const message =
    status === "authenticated"
      ? `Greetings ${session?.user?.name}`
      : `Login to see your name`;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto flex flex-col items-center h-screen p-4">
        <div className="mt-[60px]">{message}</div>
        <div className="mt-20">
          <DeckAlgo />
        </div>
      </div>
    </>
  );
};

export default Home;
