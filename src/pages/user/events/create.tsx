import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaLocationArrow, FaPlus } from "react-icons/fa";
import { Carousel } from "../../../components/Carousel";
import { TicketCreateCard } from "../../../components/Event";
import withLayout from "../../../components/Layout";
import { useModal } from "../../../components/Modal";

const CreateEvent: NextPage = () => {
  const { data: session, status } = useSession();
  console.info(session, status, "Session data");

  const router = useRouter();

  // TODO: Setup alert modal
  const [payModal, PaymentModal] = useModal({
    title: "Choose Payment Method",
    content: <></>,
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [totalTickets, setTotalTIckets] = useState<number | undefined>();

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
        <div className="carousel-item w-full h-full flex flex-col">
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
          </div>
        </div>
        <div className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-3 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow">
            {/* Ticket creation panel */}
            <TicketCreateCard />
          </div>
        </div>
        <div className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow"></div>
        </div>
      </Carousel>
      <div className="w-full h-16 rounded-box px-5 max-w-md border-t-[1px] border-dashed border-black">
        <button
          className="bg-white w-full h-full p-5 text-orange-500 text-lg bg-transparent font-semibold flex items-center justify-center rounded-b-2xl relative"
          onClick={(e) => {
            console.log("Create event clicked", e);
            // payModal.show();
          }}
        >
          Create
          <FaPlus className="ml-3 text-md font-light" />
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
