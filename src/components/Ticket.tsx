export const Ticket = () => {
  return (
    <div className="w-full h-44 overflow-clip">
      <div className="w-full h-full relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-yellow-200 via-orange-500 to-lime-500 group-hover:from-yellow-700 group-hover:to-lime-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-lime-800">
        <div className="w-full h-full relative flex items-start justify-start px-5 py-2.5 transition-all ease-in duration-75 bg-black text-white font-medium dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {/* Content area */}
          <span className="text-white">Content would go here</span>
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
