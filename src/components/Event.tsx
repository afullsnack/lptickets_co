import { Event } from "@prisma/client";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { FaShare, FaStar } from "react-icons/fa";
import { TicketData } from "../pages/[user_type]/events/create";

export const EventCard = ({
  onClick,
  onShareClicked,
  onFaveClicked,
  isFaved = false,
  item,
  isFaveLoading = false,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  onShareClicked: MouseEventHandler<SVGElement>;
  onFaveClicked: MouseEventHandler<SVGElement>;
  isFaved: Boolean;
  item: Event;
  isFaveLoading: Boolean;
}) => {
  return (
    <div className="flex items-stretch justify-center w-full rounded-xl overflow-hidden mb-3 last:mb-0 border-slate-100 border-4">
      <div
        className="w-full p-5 flex-[4] flex flex-col items-start justify-center hover:cursor-pointer"
        onClick={onClick}
      >
        <h1 className="text-gray-100 text-lg font-bold mb-1">{item.title}</h1>
        <h1 className="text-gray-400 text-xs text-ellipsis font-light mb-4">
          {item.description}
        </h1>
        <span className="text-slate-100 text-xs font-semibold">Place</span>
        <span className="text-gray-400 text-sm font-semibold w-full text-ellipsis">
          {item.location}
        </span>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-100 text-xs font-semibold">Date</span>
            <span className="text-gray-400 text-sm font-semibold">
              {item.dateTime.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-100 text-xs font-semibold">Time</span>
            <span className="text-gray-400 text-sm font-semibold">
              {item.dateTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-100 text-xs font-semibold">Cost</span>
            <span className="text-gray-400 text-sm font-semibold">$$$</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-100 text-xs font-semibold">
              Tickets left
            </span>
            <span className="text-gray-400 text-sm font-semibold">Hidden</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly items-center rounded-r-xl border-slate-100 border-l-4">
        <FaShare
          className="text-white hover:cursor-pointer"
          onClick={onShareClicked}
        />
        <div className="w-full h-1 bg-slate-100"></div>

        {isFaveLoading && (
          <svg
            role="status"
            className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-200"
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
        )}
        {!isFaveLoading && (
          <FaStar
            className={`${
              isFaved ? "text-yellow-200" : "text-white"
            } hover:cursor-pointer`}
            onClick={onFaveClicked}
          />
        )}
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
          <a className="block px-4 py-2 text-yellow-200 visited:text-yellow-400">
            Create ticket
          </a>
        </Link>
      </h1>
    </div>
  </div>
);

export const TicketCreateCard = ({
  tickets,
  setTickets,
  index,
  removeTicket,
}: {
  tickets: Array<TicketData>;
  setTickets: Function;
  index: number;
  removeTicket: (type: string) => any;
}) => {
  const [type, setType] = useState(tickets[index]?.type);
  const [cost, setCost] = useState(tickets[index]?.cost);
  const [count, setCount] = useState(tickets[index]?.count);
  const [addons, setAddons] = useState<string[]>(tickets[index]?.addons!);

  return (
    <div
      className="flex flex-col items-stretch justify-center w-full h-auto border-orange-300 border p-2 rounded-xl mb-3 last:mb-0"
      // onBlur={(e) => {
      //   console.log("Blur action", e);
      // }}
    >
      <div className="w-full flex items-start justify-center space-x-2 mb-4">
        <div className="mb-4 w-full">
          <label
            htmlFor="type"
            className="block items-center justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
              console.log("Ticket count data", e.target.value);
              setCount(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-full flex items-start justify-center space-x-2 mb-4">
        <div className="mb-0 flex-1">
          <label
            htmlFor="cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-ellipsis"
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
              console.log("Ticket cost data", e.target.value);
              setCost(e.target.value);
            }}
          />
        </div>
        <div className="mb-0 w-full flex-[2]">
          <label
            htmlFor="addons"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Addons (seperate with commas)
          </label>
          <input
            type="text"
            id="addons"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="e.g: Free WiFi, Gift bags"
            required
            // value={addons[0]}
            onChange={(e) => {
              console.log("Ticket addons data", e.target.value);
              if (e.target.value.includes(",")) {
                const splitEntry = e.target.value.split(",");
                if (splitEntry.length) {
                  setAddons(splitEntry);
                }
              }
            }}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center space-x-2 mb-0">
        {type && (
          <button
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-full flex-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => {
              removeTicket(type!);
            }}
          >
            Remove
          </button>
        )}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full flex-[2] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={(e) => {
            console.log("Type blur action", e);
            tickets[index] = {
              type: type,
              cost: cost,
              count: count,
              addons: addons,
            };
            setTickets([...tickets]);
          }}
        >
          Save Ticket
        </button>
      </div>
    </div>
  );
};
