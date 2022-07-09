import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { EventCard } from "../../../components/Event";
import withLayout from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";

const Events: NextPage = () => {
  const router = useRouter();
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
            className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-2xl p-2 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-300"
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
                    Create ticket
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Metrics
                </a>
              </li>
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
      {new Array(5).fill("event name").map((item, idx) => (
        <EventCard
          key={item + idx.toString()}
          onClick={(e: any) => {
            console.log("EventCard clicked", e);
            router.push(`/user/events/${item + idx.toString()}`);
          }}
        />
      ))}
    </div>
  );
};

export default withLayout(Events);
