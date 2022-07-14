import { NextPage } from "next";
import { signIn } from "next-auth/react";
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
import { POSTicket } from "../../../components/Ticket";
import { trpc } from "../../../utils/trpc";

const SingleEvent: NextPage = () => {
  const router = useRouter();
  const { evid, user_type } = router.query;
  console.log(evid, user_type, "Query params");

  const { data, isLoading, error } = trpc.useQuery([
    "events.getSingle",
    { eventId: evid as string },
  ]);

  console.log(data, isLoading, error, "Get single event data");

  // TODO: Setup payment modal
  const [payModal, PaymentModal] = useModal({
    title: "Choose Payment Method",
    content: <PaymentModalContent />,
  });

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center space-y-0 my-0 mx-auto">
      <div className="flex items-center justify-between mb-8 py-2 px-5 space-x-4 w-full">
        <AiOutlineArrowLeft
          className="text-white text-lg"
          onClick={(e) => router.back()}
        />
        <span className="text-white text-[16px] font-normal">
          Event: {data?.title}
        </span>
        <AiOutlineExclamationCircle
          className="text-white text-lg"
          onClick={(e) => {
            console.log("More info clicked", e);
          }}
        />
      </div>
      {!data && !isLoading && error && (
        <>
          <h1 className="text-lg text-white font-serif font-light">
            {error.message}
          </h1>
          <br />
          <button
            className="block w-full px-4 py-2 text-sm text-center text-green-400 hover:bg-green-400 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-green-400"
            onClick={(e) => {
              console.log("Signin clicked", e);
              signIn("google", {
                callbackUrl:
                  process.env.NODE_ENV === "production"
                    ? `${process.env.NEXTAUTH_URL}/user/events`
                    : "http://localhost:3000/user/events",
              });
            }}
          >
            Sign in
          </button>
        </>
      )}
      {isLoading && (
        <div className="flex flex-grow items-center justify-center">
          <svg
            role="status"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-200"
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
      {!isLoading && !error && data && (
        <Carousel itemLen={3}>
          <div className="carousel-item w-full h-full flex flex-col">
            <div className="bg-transparent border-4 border-slate-100 p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-220px)] rounded-box flex-grow">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="bg-orange-500 text-white text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                  Concert
                </span>
                <FaShareSquare
                  className="text-white"
                  onClick={(e) => {
                    console.log("Share icon clicked", e);
                  }}
                />
              </div>
              <h1 className="text-slate-100 text-lg font-bold">
                {data?.title}
              </h1>
              <span className="text-gray-400 text-xs font-light">
                {data?.description}
              </span>
              <div className="divider"></div>

              <span className="text-slate-100 text-xs font-semibold">
                Place
              </span>
              <span className="text-gray-400 text-sm font-semibold w-full text-ellipsis">
                {data?.location}
              </span>
              <div className="w-full flex items-center justify-between mt-8">
                <div className="flex flex-col flex-1">
                  <span className="text-slate-100 text-xs font-semibold">
                    Date
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">
                    {data?.dateTime.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-slate-100 text-xs font-semibold">
                    Time
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">
                    {data?.dateTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="w-full flex items-center justify-between mt-8">
                <div className="flex flex-col flex-1">
                  <span className="text-slate-100 text-xs font-semibold">
                    Cost
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">
                    $$$
                  </span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-slate-100 text-xs font-semibold">
                    Tickets left
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">
                    Hidden
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col flex-grow items-start justify-center mt-8">
                <span className="text-slate-100 text-xs font-semibold mb-3">
                  Event media
                </span>
                <div className="w-full flex flex-grow -space-x-5">
                  <img
                    className="w-1/4 h-full rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <img
                    className="w-1/4 h-full rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <img
                    className="w-1/4 h-full rounded-box border-2 border-white dark:border-gray-800"
                    src="/flutterwave-logo-2.jpeg"
                    alt=""
                  />
                  <a
                    className="flex justify-center items-center w-1/4 h-full text-xs font-medium text-white bg-gray-700 rounded-box border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                    href="#"
                  >
                    +3
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item w-full h-full flex flex-col">
            <div className="relative bg-transparent border-0 border-slate-100 p-3 flex flex-col items-stretch w-full mobile:h-[calc(100vh-220px)] rounded-box flex-grow overflow-y-scroll">
              {/* Tickets go in here */}
              {data.tickets.map((item, idx) => (
                <POSTicket key={item.id} item={item} />
              ))}
              <button className="text-sm p-4 border-4 rounded-box border-gray-400 bg-transparent absolute bottom-0 left-0 right-0 mx-3">
                Checkout 3 ($800) tickets
              </button>
            </div>
          </div>
          {/* <div className="carousel-item w-full h-full flex flex-col">
            <div className="bg-white p-5 flex flex-col items-stretch w-full mobile:h-[calc(100vh-280px)] rounded-box flex-grow"></div>
          </div> */}
        </Carousel>
      )}
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
