import type { NextPage } from "next";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
// import { trpc } from "../utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { BASE_URL } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // TODO: Handle google signup and redirection with session
  const { data: session, status } = useSession();

  return (
    <div className="w-screen h-screen bg-black">
      <div className="container relative flex flex-col items-center justify-center bg-transparent min-h-screen overflow-hidden p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0">
        <div className="flex w-auto absolute top-1/3 items-center justify-center bg-transparent rounded-t-box rounded-br-box">
          <img src="/logo/logo-white.png" width={300} alt="Logo" />
        </div>
        <div className="absolute bottom-0 right-0 left-0 h-auto">
          <div className="absolute bottom-10 left-0 desktop:left-1/3 h-auto px-6 py-3 flex flex-col">
            {!session?.user && (
              <div className="w-full p-2 bg-[rgba(0,0,0,.4)]">
                <span className="text-sm text-white font-medium mb-3">
                  Explore as a guest or
                </span>
              </div>
            )}
            {!session?.user && (
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-200 to-lime-500 group-hover:from-yellow-700 group-hover:to-lime-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-lime-800"
                onClick={(e) => {
                  console.log("Clicked on sign in", e);
                  signIn("google", {
                    callbackUrl: `${BASE_URL}/`,
                  });
                }}
              >
                <span className="relative flex items-center justify-center px-5 py-2.5 transition-all ease-in duration-75 bg-black text-white font-medium dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </span>
              </button>
            )}
            {session?.user && (
              <div className="flex flex-col w-full p-2 bg-[rgba(0,0,0,.4)]">
                <span className="text-sm font-light mb-2">Welcome</span>
                <span className="text-2xl font-semibold">
                  {session?.user.name}
                </span>
              </div>
            )}
          </div>
          <div className="group bg-white w-20 h-20 rounded-full absolute right-0 desktop:right-1/3 bottom-10 p-3 z-10 active:p-2 transition-all">
            <Link
              href={session?.user ? "/user/events" : "/guest/events"}
              passHref
            >
              <div className="bg-black w-full h-full rounded-full flex items-center justify-center hover:cursor-pointer">
                <AiOutlineArrowRight className="text-white text-xl active:relative group-active:-translate-x-2/3 transition-all" />
              </div>
            </Link>
          </div>
          <div className="bg-white w-20 h-20 rounded-full absolute right-[-60px] bottom-10 desktop:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
