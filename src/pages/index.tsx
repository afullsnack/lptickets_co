import type { NextPage } from "next";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // TODO: Handle google signup and redirection with session

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center bg-black min-h-screen overflow-hidden p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0">
        <div className="absolute bottom-0 right-0 left-0 h-auto">
          <div className="absolute bottom-10 left-0 h-auto px-6 py-3">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
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
          </div>
          <div className="bg-white w-20 h-20 rounded-full absolute right-0 bottom-10 p-3 z-10 active:p-2 transition-all">
            <Link href={"/user/events"} passHref>
              <div className="bg-black w-full h-full rounded-full flex items-center justify-center hover:cursor-pointer">
                <AiOutlineArrowRight className="text-white text-xl" />
              </div>
            </Link>
          </div>
          <div className="bg-white w-20 h-20 rounded-full absolute right-[-60px] bottom-10 desktop:hidden"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
