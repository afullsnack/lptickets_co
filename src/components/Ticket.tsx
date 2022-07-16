// import Barcode from 'react-barcode';

import { Ticket } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartItem } from "../pages/[user_type]/events/[evid]";

export const OwnedTicket = ({ item }: { item: Ticket }) => {
  return (
    <div className="w-full h-60 overflow-clip mb-3 last:mb-0">
      <div className="w-full h-full relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-yellow-200 via-orange-500 to-lime-500 group-hover:from-yellow-700 group-hover:to-lime-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-lime-800">
        <div className="w-full h-full relative flex items-stretch justify-center transition-all ease-in duration-75 bg-black text-white font-medium dark:bg-gray-900 rounded-md group-hover:cursor-pointer">
          {/* Content area */}
          <div className="flex-[3] px-6 py-7 flex flex-col items-start justify-between">
            {/* Owner details */}
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/logo/logo-white.png"
                className="desktop:w-12 desktop:h-12 mobile:w-10 mobile:h-10 rounded-full bg-transparent border-2 border-white"
              />
              <div className="flex flex-col">
                <h2 className="desktop:text-lg mobile:text-base text-slate-300 font-normal font-sans text-ellipsis">
                  Ticket owner name
                </h2>
                <span className="desktop:text-sm mobile:text-xs text-slate-100 font-light font-sans text-ellipsis">
                  owner@lp.tickets
                </span>
              </div>
            </div>

            {/* Event detail */}
            <div className="flex items-center justify-start space-x-5">
              {/* Event titlte and media */}
              <div className="flex flex-col space-y-2 w-max">
                <h2 className="text-sm text-ellipsis text-gray-100 font-normal mb-3">
                  Event title long
                </h2>
                <div className="flex -space-x-5">
                  <img
                    className="w-10 h-10 rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <img
                    className="w-10 h-10 rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <img
                    className="w-10 h-10 rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <a
                    className="flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-box border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                    href="#"
                  >
                    +3
                  </a>
                </div>
              </div>
              <div className="flex flex-col space-y-2 flex-1">
                <h2 className="text-base text-gray-100 font-normal">
                  22/01/2021 <br />
                  2:00PM
                </h2>
                <h2 className="text-sm text-slate-300 font-normal">
                  Event Location
                </h2>
              </div>
            </div>
          </div>
          <div className="flex-1 border-l border-gray-300 border-dashed">
            {/* Barcode goes here */}
          </div>
        </div>

        {/* Grooves */}
        <div className="absolute -left-4 w-8 h-8 rounded-full bg-yellow-200 p-1">
          <div className="w-full h-full rounded-full bg-black"></div>
        </div>
        <div className="absolute -right-4 w-8 h-8 rounded-full bg-lime-500 p-1">
          <div className="w-full h-full rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export const POSTicket = ({
  item,
  updateCart,
  cart,
}: {
  item: Ticket;
  updateCart: Dispatch<SetStateAction<CartItem[]>>;
  cart: CartItem[];
}) => {
  const [selected, setSelected] = useState(false);
  const [qty, setQty] = useState<number>(1);

  const addCb = useCallback(() => {
    setQty(qty + 1);
  }, [qty]);

  const minusCb = useCallback(() => {
    if (qty <= 1) setQty(1);
    else setQty(qty - 1);
  }, [qty]);

  // New addition and removal
  useEffect(() => {
    console.log("Event fired");
    if (selected) {
      // UpdateCart
      updateCart([...cart, { ticketId: item.id, cost: item.cost, qty }]);
      console.log(cart, "Added item to cart");
    } else {
      if (cart?.length)
        updateCart(cart?.filter((val) => val.ticketId !== item.id));

      console.log(cart, "Removed item from cart");
    }
  }, [selected]);

  // Update on qty change
  useEffect(() => {
    if (cart?.length) {
      const idx = cart?.findIndex((val) => (val.ticketId = item.id));
      cart[idx]!.qty = qty;
      updateCart([...cart]);
      console.log(cart, "Updated cart");
    }
  }, [qty]);

  return (
    <div className="w-full h-60 overflow-clip mb-3 last:mb-0">
      <div
        className={`w-full h-full relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-box group bg-gradient-to-r ${
          selected
            ? "from-yellow-200 via-orange-500 to-lime-500"
            : "from-gray-400 to-gray-600"
        } group-hover:from-yellow-700 group-hover:to-lime-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-lime-800`}
      >
        <div className="w-full h-full relative flex items-stretch rounded-box justify-center transition-all ease-in duration-75 bg-black text-white font-medium dark:bg-gray-900 group-hover:cursor-pointer">
          {/* Content area */}
          <div className="flex-[3] px-6 py-7 flex flex-col items-start justify-between">
            {/* Owner details */}
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`desktop:w-12 desktop:h-12 p-1  font-bold text-sm mobile:text-xs mobile:w-10 mobile:h-10 transform -rotate-45 flex items-center justify-center rounded-full bg-transparent border-2 ${
                  selected
                    ? "text-yellow-200 border-yellow-200"
                    : "text-gray-400 border-gray-300"
                } `}
                onClick={() => {
                  setSelected(!selected);
                }}
              >
                {item.type}
              </div>
              <div className="flex flex-col">
                <h2 className="desktop:text-lg mobile:text-base text-slate-300 font-normal font-sans text-ellipsis">
                  ${item.cost.toString()}
                </h2>
                <span className="desktop:text-sm mobile:text-xs text-slate-100 font-light font-sans text-ellipsis">
                  {item.addons.length ? item.addons.join(", ") : null}
                </span>
              </div>
            </div>

            {/* Event detail */}
            <div className="w-full flex items-center justify-start space-x-2">
              <div className="flex flex-col flex-1">
                <span className="text-slate-100 text-xs font-semibold">
                  Total tickets
                </span>
                <span className="text-gray-400 text-sm font-semibold">
                  {item.ticketCount.toString()}
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-slate-100 text-xs font-semibold">
                  Total sales
                </span>
                <span className="text-gray-400 text-sm font-semibold">
                  {item.saleCount.toString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-evenly items-center border-l-2 border-gray-300 border-dashed">
            {/* Cart actions go here goes here */}
            <FaPlus
              className={`${selected ? "text-white" : "text-gray-600"}`}
              onClick={addCb}
            />
            <span
              className={`${
                selected ? "text-white" : "text-gray-600"
              } font-sans font-bold text-sm text-clip`}
            >
              {qty.toString()}
            </span>
            <FaMinus
              className={`${selected ? "text-white" : "text-gray-600"}`}
              onClick={minusCb}
            />
          </div>
        </div>

        {/* Grooves */}
        <div
          className={`absolute -left-4 w-8 h-8 rounded-full ${
            selected ? "bg-yellow-200" : "bg-gray-400"
          } p-1`}
        >
          <div className="w-full h-full rounded-full bg-black"></div>
        </div>
        <div
          className={`absolute -right-4 w-8 h-8 rounded-full ${
            selected ? "bg-lime-500" : "bg-gray-600"
          } p-1`}
        >
          <div className="w-full h-full rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
};
