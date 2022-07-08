import { FaShare, FaStar } from "react-icons/fa";

export const EventCard = ({ onClick }) => {
  return (
    <div className="flex items-stretch justify-center w-full rounded-xl overflow-hidden mb-3">
      <div
        className="w-full bg-gray-100 p-3 flex-[4] flex flex-col items-start justify-center"
        onClick={onClick}
      >
        <h1 className="text-gray-700 text-lg font-bold mb-4">Event Title</h1>
        <span className="text-slate-400 text-xs font-semibold">Place</span>
        <span className="text-gray-800 text-sm font-semibold w-full text-ellipsis">
          New York, Madison Square Garden
        </span>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Date</span>
            <span className="text-gray-800 text-sm font-semibold">
              10.08.2021
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Time</span>
            <span className="text-gray-800 text-sm font-semibold">9:00AM</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Cost</span>
            <span className="text-gray-800 text-sm font-semibold">$200</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-slate-400 text-xs font-semibold">Seat</span>
            <span className="text-gray-800 text-sm font-semibold">32</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-evenly items-center rounded-r-xl border-gray-100 border-4 border-solid">
        <FaShare
          color="white"
          onClick={(e) => {
            console.log("Share icon clicked", e);
          }}
        />
        <div className="w-full h-1 bg-gray-300"></div>
        <FaStar
          color="white"
          onClick={(e) => {
            console.log("Fave icon clicked", e);
          }}
        />
      </div>
    </div>
  );
};
