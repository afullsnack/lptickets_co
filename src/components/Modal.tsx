import { useState } from "react";

export function useModal({ title, content }) {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);

  const hide = () => setVisible(false);

  return [
    {
      visibility: visible,
      show,
      hide,
    },
    () => (
      <div
        id="registerOTPModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          visible ? null : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b bg-slate-100">
              <h3 className="text-lg font-medium text-gray-700 desktop:">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-500 bg-opacity-50 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="registerOTPModal"
                onClick={() => hide()}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6 flex flex-col">{content}</div>
          </div>
        </div>
      </div>
    ),
  ] as [
    { visibility: boolean; show: () => void; hide: () => void },
    () => JSX.Element
  ];
}
