// import Barcode from 'react-barcode';

export const Ticket = () => {
  return (
    <div className="w-full h-60 overflow-clip mb-3 last:mb-0">
      <div className="w-full h-full relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-yellow-200 via-orange-500 to-lime-500 group-hover:from-yellow-700 group-hover:to-lime-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-lime-800">
        <div className="w-full h-full relative flex items-stretch justify-center transition-all ease-in duration-75 bg-black text-white font-medium dark:bg-gray-900 rounded-md group-hover:cursor-pointer">
          {/* Content area */}
          <div className="flex-[3] px-7 py-7 flex flex-col items-start justify-between">
            {/* Owner details */}
            <div className="flex items-center justify-center space-x-4">
              <div className="desktop:w-12 desktop:h-12 mobile:w-10 mobile:h-10 rounded-full bg-gray-400"></div>
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
                <div className="flex -space-x-4">
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
                <h2 className="text-lg text-gray-100 font-normal">
                  22/01/2021 - 2:00PM
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
