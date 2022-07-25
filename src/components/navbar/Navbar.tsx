import { signIn, useSession } from "next-auth/react";
import { Button } from "../button";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="absolute w-full bg-gray-300 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex items-center">
          {status === "unauthenticated" ? (
            <Button onClick={() => signIn()}>Log in</Button>
          ) : (
            <Button onClick={() => console.log("logout")}>Log out</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
