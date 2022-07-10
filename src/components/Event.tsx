import Link from "next/link";
import { useState } from "react";
import { FaShare, FaStar } from "react-icons/fa";

export const EventCard = ({ onClick }: any) => {
  return (
    <div className="flex items-stretch justify-center w-full rounded-xl overflow-hidden mb-3 last:mb-0">
      <div
        className="w-full bg-gray-100 p-3 flex-[4] flex flex-col items-start justify-center"
        onClick={onClick}
      >
        <h1 className="text-gray-700 text-lg font-bold mb-4">Event Title</h1>
        <span className="text-slate-400 text-xs font-semibold">Place</span>
        <span className="text-gray-800 text-sm font-semibold w-full text-ellipsis">
          New York, Madison Square Garden
        </span>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Date</span>
            <span className="text-gray-800 text-sm font-semibold">
              10.08.2021
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Time</span>
            <span className="text-gray-800 text-sm font-semibold">9:00AM</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Cost</span>
            <span className="text-gray-800 text-sm font-semibold">$200</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Seat</span>
            <span className="text-gray-800 text-sm font-semibold">32</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly items-center rounded-r-xl border-gray-100 border-4 border-solid">
        <FaShare
          color="white"
          onClick={(e) => {
            console.log("Share icon clicked", e);
          }}
        />
        <div className="w-full h-1 bg-gray-300"></div>
        <FaStar
          color="white"
          onClick={(e) => {
            console.log("Fave icon clicked", e);
          }}
        />
      </div>
    </div>
  );
};

export const EmptyCard = () => (
  <div className="flex items-stretch justify-center w-full rounded-xl overflow-hidden mb-3 last:mb-0">
    <div
      className="w-full bg-gray-100 p-3 flex flex-col items-start justify-center"
      // onClick={onClick}
    >
      <h1 className="text-gray-800 text-md text-center font-normal">
        No events have been added yet, click the button at the top right to
        create a new event.
        <Link href="/user/events/create" passHref>
          <a className="block px-4 py-2 text-orange-500 visited:text-orange-700">
            Create ticket
          </a>
        </Link>
      </h1>
    </div>
  </div>
);

export const TicketCreateCard = () => {
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [count, setCount] = useState("");
  return (
    <div className="flex flex-col items-stretch justify-center w-full h-auto border-orange-300 border p-2 rounded-xl overflow-hidden mb-3 last:mb-0">
      <div className="mb-4 w-full">
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Ticket type
        </label>
        <input
          type="text"
          id="type"
          className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          placeholder="e.g: Regular, VIP, VVIP"
          required
          value={type}
          onChange={(e) => {
            console.log("Ticket type data", e.target.value);
            setType(e.target.value);
          }}
        />
      </div>
      <div className="w-full flex items-center justify-center space-x-2">
        <div className="mb-0 w-full">
          <label
            htmlFor="cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ticket cost ($)
          </label>
          <input
            type="text"
            id="cost"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="e.g: $200"
            required
            value={cost}
            onChange={(e) => {
              console.log("Ticket type data", e.target.value);
              setCost(e.target.value);
            }}
          />
        </div>
        <div className="mb-0 w-full">
          <label
            htmlFor="count"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ticket count
          </label>
          <input
            type="text"
            id="count"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="e.g: 30"
            required
            value={count}
            onChange={(e) => {
              console.log("Ticket type data", e.target.value);
              setCount(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
