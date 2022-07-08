import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { FaStar, FaTicketAlt } from "react-icons/fa";
// import resolveConfig from "tailwindcss/resolveConfig";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config"; // Fix the path
// import { ButtonPrimary } from "./Button";
// import Logo from "./Logo";

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value: string): number =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf("px")
  );

export const getCurrentBreakpoint = (): string | undefined => {
  let currentBreakpoint: string | undefined;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

export default function withLayout(BaseComp: React.ElementType) {
  const Page: React.FunctionComponent = (props) => {
    const router = useRouter();
    const { pathname } = router;
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      console.log(getCurrentBreakpoint(), "Break point value");
      setIsMobile(getCurrentBreakpoint() === "mobile");

      function handleResize() {
        setIsMobile(getCurrentBreakpoint() === "mobile");
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); //Call once

    return (
      <>
        {/* <Logo /> */}
        {/* {!isMobile && ( */}
        <div className="desktop:flex mobile:hidden w-[100%] bg-black flex items-center justify-center desktop:pr-6 desktop:pl-3 pr-4">
          <div className="w-[100%] max-w-lg h-20 flex py-2 items-stretch justify-center rounded-sm bg-transparent">
            <div
              className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                pathname.includes("favorite")
                  ? "bg-orange-500"
                  : "bg-transparent"
              } rounded-xl`}
              onClick={(e) => router.push("/user/favorite")}
            >
              <FaStar
                size={20}
                // color={pathname.includes("wallet") ? "#0059AC" : "#8895A7"}
                className="text-white"
              />
              <span className={`text-md font-medium  ml-2 text-white`}>
                Favorite
              </span>
            </div>
            <div
              className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                pathname.includes("events") ? "bg-orange-500" : "bg-transparent"
              } rounded-xl`}
              onClick={(e) => router.push("/user/events")}
            >
              <AiFillAppstore
                size={20}
                // color={pathname.includes("home") ? "#0059AC" : "#8895A7"}
                className="text-white"
              />
              <span className={`text-md font-medium ml-2 text-white`}>
                Events
              </span>
            </div>

            <div
              className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                pathname.includes("tickets")
                  ? "bg-orange-500"
                  : "bg-transparent"
              } rounded-xl`}
              onClick={(e) => router.push("/user/tickets")}
            >
              <FaTicketAlt
                size={20}
                // color={pathname.includes("market") ? "#0059AC" : "#8895A7"}
                className="text-white"
              />
              <span className={`text-md font-medium  ml-2 text-white`}>
                Tickets
              </span>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* <div className="rounded-md w-auto h-8 flex items-center justify-center">
            <div className="flex items-center justify-center py-2 px-2 rounded-md border-solid border-[#E2EDF6] border-[1px] bg-transparent mr-2">
              <div className="indicator">
                <span className="indicator-item badge badge-error badge-xs"></span>
                <FaBell color="#8895A7" size={"14px"} />
              </div>
            </div>
          </div> */}
        <div className="container">
          <div className="w-[100%] mobile:pb-[100px] p-0 min-h-screen h-max flex flex-col items-center justify-start my-0 mx-auto scroll-smooth">
            <BaseComp {...props} />
          </div>
          {/* {isMobile && ( */}
          <div className="mobile:visible desktop:hidden w-[100%] bg-black flex items-center mobile:justify-center justify-center py-4 mobile:px-5 fixed bottom-0 left-0 right-0">
            <div className="w-[100%] max-w-md h-16 flex py-2 items-stretch justify-center rounded-sm bg-transparent">
              <div
                className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                  pathname.includes("favorite")
                    ? "bg-orange-500"
                    : "bg-transparent"
                } rounded-xl`}
                onClick={(e) => router.push("/user/favorite")}
              >
                <FaStar
                  size={20}
                  // color={pathname.includes("wallet") ? "#0059AC" : "#8895A7"}
                  className="text-white"
                />
                {/* <span
                    className={`text-md font-medium  ml-2 ${
                      pathname.includes("wallet")
                        ? "text-primary"
                        : "text-slate-600"
                    }`}
                  >
                    Favorite
                  </span> */}
              </div>
              <div
                className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                  pathname.includes("events")
                    ? "bg-orange-500"
                    : "bg-transparent"
                } rounded-xl`}
                onClick={(e) => router.push("/user/events")}
              >
                <AiFillAppstore
                  size={20}
                  // color={pathname.includes("home") ? "#0059AC" : "#8895A7"}
                  className="text-white"
                />
                {/* <span
                  className={`text-md font-medium ml-2 ${
                    pathname.includes("home")
                      ? "text-primary"
                      : "text-slate-600"
                  }`}
                >
                  Events
                </span> */}
              </div>

              <div
                className={`flex-1 flex items-center justify-center px-2 hover:cursor-pointer transition-all ${
                  pathname.includes("tickets")
                    ? "bg-orange-500"
                    : "bg-transparent"
                } rounded-xl`}
                onClick={(e) => router.push("/user/tickets")}
              >
                <FaTicketAlt
                  size={20}
                  // color={pathname.includes("market") ? "#0059AC" : "#8895A7"}
                  className="text-white"
                />
                {/* <span
                  className={`text-md font-medium  ml-2 ${
                    pathname.includes("market")
                      ? "text-primary"
                      : "text-slate-600"
                  }`}
                >
                  Tickets
                </span> */}
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </>
    );
  };

  return Page;
}
