import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { EmptyCard, EventCard } from "../../../components/Event";
import withLayout from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";

const Events: NextPage = () => {
  const { data: session, status } = useSession();
  console.info(session, status, "Session data");
  const router = useRouter();
  const { user_type } = router.query;
  console.log(user_type, "User type wuery params");

  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const { data, isLoading, error } = trpc.useQuery(["events.getAll"]);
  console.log(data, isLoading, error, "Query request for events");

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center my-0 mx-auto">
      <div className="w-full flex items-center justify-center space-x-4 mb-8">
        <form className="w-full flex-grow">
          {/* <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Your Email
          </label> */}
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 hover:cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block p-4 pl-10 w-full text-sm text-white bg-transparent rounded-xl border-2 border-gray-300 focus:ring-orange-400 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-500 placeholder:text-white placeholder:opacity-100"
              placeholder="Search"
              required
            />
            {/* <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            // id="defaultActionsDropdown"
            // data-dropdown-toggle="menuDropdown"
            // data-dropdown-placement="bottom"
            className="text-white bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-2xl p-2 text-center inline-flex items-center dark:bg-yellow-300 dark:hover:bg-yellow-500 dark:focus:ring-yellow-300"
            onClick={(e) => {
              console.log("Popup menu clicked", e);
              // router.push("/user/events/create");
              setShowActionsMenu(!showActionsMenu);
            }}
          >
            <AiOutlineExclamationCircle style={{ fontWeight: "bolder" }} />
          </button>
          {/* <!- Dropdown menu ->  ${
              showActionsMenu ? "visible" : "hidden"
            } */}
          <div
            id="menuDropdown"
            className={`z-10 dropdown-content bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 transition-all`}
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>Bonnie Green</div>
              <div className="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="defaultActionsDropdown"
              tabIndex={0}
            >
              <li>
                <Link href="/user/events/create" passHref>
                  <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Create event
                  </a>
                </Link>
              </li>
              {(typeof session !== null || typeof session !== "undefined") &&
                session?.user?.role !== "USER" && (
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Metrics
                    </a>
                  </li>
                )}
            </ul>
            <div className="py-1">
              <Link href="" passHref>
                <a
                  onClick={(e) => {
                    console.log("Logout clicked", e);
                    signOut({ callbackUrl: "http://localhost:3000" });
                  }}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-red-500"
                >
                  Logout
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex flex-grow items-center justify-center">
          <svg
            role="status"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {!isLoading && !data && error && (
        <>
          <h1 className="text-lg text-white font-serif font-light">
            {error.message}
          </h1>
        </>
      )}
      {!isLoading &&
        data &&
        data.map((item) => (
          <EventCard
            key={item.id}
            item={item}
            onClick={(e: any) => {
              console.log("EventCard clicked", e);
              router.push(`/user/events/${item.id}`);
            }}
            onShareClicked={function (event): void {
              throw new Error("Function not implemented.");
            }}
            onFaveClicked={function (event): void {
              throw new Error("Function not implemented.");
            }}
            isFaved={false}
          />
        ))}
      {!isLoading && !data?.length && <EmptyCard />}
    </div>
  );
};

export default withLayout(Events);
