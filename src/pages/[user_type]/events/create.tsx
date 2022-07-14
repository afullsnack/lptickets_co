import { Event } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaLocationArrow, FaPlus } from "react-icons/fa";
import { Carousel } from "../../../components/Carousel";
import { TicketCreateCard } from "../../../components/Event";
import withLayout from "../../../components/Layout";
import { useModal } from "../../../components/Modal";
import { CreateEventData } from "../../../server/router/event";
import { CreateTicketData } from "../../../server/router/ticket";
import { trpc } from "../../../utils/trpc";

export interface TicketData {
  type: string | undefined;
  cost: string | undefined;
  count: string | undefined;
  addons: string[] | undefined;
}

const CreateEvent: NextPage = () => {
  const { data: session, status } = useSession();
  console.info(session, status, "Session data");

  // Setup mutation calls
  const createEvent = trpc.useMutation(["events.create"], {
    onError(err) {
      console.log(err, "Error in creating event");
    },
    onSuccess(data) {
      console.log(data, "Data after creating event");
    },
  });

  const createTicket = trpc.useMutation(["ticket.create"], {
    onError(err) {
      console.log(err, "Error in creating ticket");
    },
    onSuccess(data) {
      console.log(data, "Data after creating ticket");
    },
  });

  const router = useRouter();
  const { pathname, asPath } = router;
  // TODO: Setup alert modal
  const [payModal, PaymentModal] = useModal({
    title: "Choose Payment Method",
    content: <></>,
  });

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [place, setPlace] = useState<string | undefined>();
  const [dateTime, setDateTime] = useState<string | undefined>();
  const [totalTickets, setTotalTIckets] = useState<number | undefined>();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(
    asPath.split("#")[1] ?? "slide1"
  );

  useEffect(() => {
    console.log(pathname, "Pathname", asPath, "asPath");
  }, [asPath]);

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-6 w-full h-full flex flex-col items-center justify-center space-y-0 my-0 mx-auto">
      <div className="flex items-center justify-start mb-8 py-2 px-5 space-x-5 w-full">
        <AiOutlineArrowLeft
          className="text-white text-lg"
          onClick={(e) => router.back()}
        />
        <span className="text-white text-[16px] font-normal">
          Create event: {title}
        </span>
        {/* <AiOutlineExclamationCircle
          className="text-white text-lg"
          onClick={(e) => {
            console.log("More info clicked", e);
          }}
        /> */}
      </div>
      {/* <div className="flex-grow flex flex-col"> */}
      <Carousel itemLen={3}>
        <div id="slide1" className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-3 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow">
            {/* <div className="flex items-center justify-between w-full mb-4">
              <span className="bg-orange-500 text-white text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                Concert
              </span>
              <FaShareSquare
                className="text-black"
                onClick={(e) => {
                  console.log("Share icon clicked", e);
                }}
              />
            </div> */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Event title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="AMVCA Awards night"
                required
                value={title}
                onChange={(e) => {
                  console.log("Title, data", e.target.value);
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Event description
              </label>
              <input
                type="text"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="This is the award show for African Music Video Awards"
                required
                value={description}
                onChange={(e) => {
                  console.log("Description, data", e.target.value);
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="divider mb-3"></div>

            <div className="w-full mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Place
              </label>
              <div className="w-full flex items-center justify-center space-x-3">
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Location of the event"
                  required
                  value={place}
                  onChange={(e) => {
                    console.log("PLace, data", e.target.value);
                    setPlace(e.target.value);
                  }}
                />
                <div className="border-orange-400 border flex p-2 bg-gray-100 rounded-lg">
                  <FaLocationArrow className="text-orange-400" />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center space-x-2 mb-6">
              <div className="mb-0 w-full">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Date / Time
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="DD/MM/YYYY"
                  required
                  value={dateTime}
                  onChange={(e) => {
                    console.log(
                      "DateTime, data",
                      e.target.value,
                      new Date(e.target.value).toISOString()
                    );
                    setDateTime(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center mb-6">
              <div className="mb-0 w-full">
                <label
                  htmlFor="ticketTotal"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Total tickets
                </label>
                <input
                  type="number"
                  id="ticketTotal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="200"
                  required
                  value={totalTickets}
                  onChange={(e) => {
                    console.log("Total tickets, data", e.target.value);
                    setTotalTIckets(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            {/* <span className="w-full text-xs text-slate-500 text-center font-thin">
              Swipe left to create tickets for your event
            </span> */}
          </div>
        </div>
        <div id="slide2" className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-3 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow overflow-y-scroll">
            {/* Ticket creation panel */}
            {tickets?.map((t, idx) => (
              <TicketCreateCard
                key={idx.toString()}
                tickets={tickets}
                setTickets={setTickets}
                index={idx}
                removeTicket={(ticketType: string) => {
                  console.log(ticketType, idx, "Tickets");
                  const newTicket = tickets.filter(
                    (ti, tidx) => ti?.type !== ticketType
                  );
                  // tickets.splice(idx, 1);
                  console.log(newTicket.length);
                  setTickets([...newTicket]);
                }}
              />
            ))}
            <div className="w-full flex flex-col items-center justify-center mt-2">
              {!tickets?.length && (
                <span className="w-full text-sm text-slate-500 text-center font-thin">
                  Click on 'Add ticket' below to add tickets to your event
                </span>
              )}
              <button
                className="text-orange-500 text-center"
                onClick={(e) => {
                  console.log("Add ticket comp to event", e);
                  if (typeof tickets !== "undefined") {
                    setTickets([
                      ...tickets,
                      { type: "", cost: "", count: "", addons: [] },
                    ]);
                  }
                }}
              >
                Add ticket
              </button>
            </div>
          </div>
        </div>
        <div id="slide3" className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-3 flex flex-col items-center justify-start space-y-3 w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow overflow-y-scroll">
            <div className="flex justify-center items-center w-9/12 flex-[3]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6 px-3">
                  <svg
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload portrait size event flyer's or image's
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div className="flex justify-center items-center w-full flex-1">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center py-4 px-3">
                  <svg
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload landscape size event flyer's or image's
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="w-full h-16 rounded-box px-5 max-w-md border-t-[1px] border-dashed border-black">
        <button
          className="bg-white w-full h-full p-5 text-orange-500 text-lg bg-transparent font-semibold flex items-center justify-center rounded-b-2xl relative"
          onClick={async (e) => {
            console.log("Create event clicked", e);
            if (currentSlide === "slide1") setCurrentSlide("slide2");
            if (currentSlide === "slide2") setCurrentSlide("slide3");
            if (currentSlide === "slide3") {
              // TODO: get data from inputs and pass to the mutate function
              if (
                !title ||
                !description ||
                !place ||
                !dateTime ||
                !totalTickets ||
                !tickets.length
              ) {
                //check to see if they are empty
                console.log("Please input all the data needed");
              } else {
                console.log("All data gotten");
                const newEventData: CreateEventData = {
                  title: title,
                  description: description,
                  location: place,
                  dateTime: new Date(dateTime),
                  totalTickets: totalTickets,
                };
                const eventData: Event = (await createEvent.mutateAsync(
                  newEventData
                )) as Event;
                console.log(eventData as Object, "event created");

                const newTicketData: CreateTicketData = tickets.map((t) => {
                  return {
                    eventId: eventData.id,
                    type: t.type!,
                    cost: Number(t.cost),
                    ticketCount: Number(t.count),
                    addons: t.addons,
                  };
                });
                const ticketData = await createTicket.mutateAsync(
                  newTicketData
                );
                console.log(eventData as Object, "event created", ticketData);
              }
            }
          }}
        >
          {currentSlide === "slide1" && <a href="#slide2">Next</a>}
          {currentSlide === "slide2" && <a href="#slide3">Next</a>}
          {currentSlide === "slide3" && (
            <>
              Create
              <FaPlus className="ml-3 text-md font-light" />
            </>
          )}
          {currentSlide === "slide3" &&
            (createEvent.isLoading || createTicket.isLoading) && (
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
          <div className="w-8 h-8 bg-black absolute right-[-16px] top-[-16px] rounded-full"></div>
          <div className="w-8 h-8 bg-black absolute left-[-16px] top-[-16px] rounded-full"></div>
        </button>
      </div>
      {/* </div> */}
      <PaymentModal />
    </div>
  );
};

export default withLayout(CreateEvent);
