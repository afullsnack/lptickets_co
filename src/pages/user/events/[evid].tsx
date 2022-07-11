import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  AiOutlineArrowLeft,
  AiOutlineExclamationCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import { Carousel } from "../../../components/Carousel";
import withLayout from "../../../components/Layout";
import { useModal } from "../../../components/Modal";
// import { trpc } from "../../../utils/trpc";

const SingleEvent: NextPage = () => {
  const router = useRouter();

  // const { data, isLoading, error } = trpc.useQuery(["events.getSingle", { eventId: }]);

  // TODO: Setup payment modal
  const [payModal, PaymentModal] = useModal({
    title: "Choose Payment Method",
    content: <PaymentModalContent />,
  });

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-6 w-full h-full flex flex-col items-center justify-center space-y-0 my-0 mx-auto">
      <div className="flex items-center justify-between mb-8 py-2 px-5 space-x-4 w-full">
        <AiOutlineArrowLeft
          className="text-white text-lg"
          onClick={(e) => router.back()}
        />
        <span className="text-white text-[16px] font-normal">
          Tickets: Event Title Long
        </span>
        <AiOutlineExclamationCircle
          className="text-white text-lg"
          onClick={(e) => {
            console.log("More info clicked", e);
          }}
        />
      </div>
      {/* <div className="flex-grow flex flex-col"> */}
      <Carousel itemLen={3}>
        <div className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="bg-orange-500 text-white text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                Concert
              </span>
              <FaShareSquare
                className="text-black"
                onClick={(e) => {
                  console.log("Share icon clicked", e);
                }}
              />
            </div>
            <h1 className="text-gray-700 text-lg font-bold">
              Event Title Long
            </h1>
            <span className="text-slate-400 text-xs font-light">
              Long text describing the event and a couple guest artist
            </span>
            <div className="divider"></div>

            <span className="text-slate-400 text-xs font-semibold">Place</span>
            <span className="text-gray-800 text-sm font-semibold w-full text-ellipsis">
              New York, Madison Square Garden
            </span>
            <div className="w-full flex items-center justify-between mt-8">
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Date
                </span>
                <span className="text-gray-800 text-sm font-semibold">
                  10.08.2021
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Time
                </span>
                <span className="text-gray-800 text-sm font-semibold">
                  9:00AM
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-8">
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Cost
                </span>
                <span className="text-gray-800 text-sm font-semibold">
                  $200
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Seat
                </span>
                <span className="text-gray-800 text-sm font-semibold">32</span>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-8">
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Section
                </span>
                <span className="text-gray-800 text-sm font-semibold">101</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-slate-400 text-xs font-semibold">
                  Event ID
                </span>
                <span className="text-gray-800 text-sm font-semibold">
                  323242NH
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow"></div>
        </div>
        <div className="carousel-item w-full h-full flex flex-col">
          <div className="bg-white p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow"></div>
        </div>
      </Carousel>
      <div className="w-full h-16 rounded-box px-5 max-w-md border-t-[1px] border-dashed border-black">
        <button
          className="bg-white w-full h-full p-5 text-black font-semibold flex items-center justify-center rounded-b-2xl relative"
          onClick={(e) => {
            console.log("Buy ticket clicked", e);
            payModal.show();
          }}
        >
          Buy Ticket
          <div className="w-8 h-8 bg-black absolute right-[-16px] top-[-16px] rounded-full"></div>
          <div className="w-8 h-8 bg-black absolute left-[-16px] top-[-16px] rounded-full"></div>
        </button>
      </div>
      {/* </div> */}
      <PaymentModal />
    </div>
  );
};

const PaymentModalContent = () => {
  return (
    <>
      <div className="flex items-center justify-start space-x-4 p-3 w-full rounded-box bg-slate-900 shadow-lg">
        <div className="w-14 h-14 rounded-xl bg-[url('/btc-ltn-pay-thumb-2.webp')] bg-cover bg-center bg-no-repeat"></div>
        {/* <img src="/flutterwave-logo.png" width={250} alt="Flutterwave logo" /> */}
        <div className="flex flex-col flex-grow ml-4">
          <span className="text-white text-lg font-semibold">Bitcoin</span>
          <span className="text-orange-400 text-sm font-light">
            Lightening network{" "}
          </span>
        </div>
        <AiOutlineLink className="text-white font-semibold text-xl" />
      </div>
      <div className="flex items-center justify-start space-x-4 p-3 w-full rounded-box bg-slate-900 shadow-lg">
        <div className="w-14 h-14 rounded-xl bg-[url('/flutterwave-logo-thumb.png')] bg-cover bg-center bg-no-repeat"></div>
        <div className="flex flex-col flex-grow">
          <span className="text-white text-lg font-semibold">Card</span>
          <span className="text-orange-400 text-sm font-light ">
            Flutterwave
          </span>
        </div>
        <AiOutlineLink className="text-white font-semibold text-xl" />
      </div>
    </>
  );
};

export default withLayout(SingleEvent);
