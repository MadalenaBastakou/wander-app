import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { FaLocationDot } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import dayjs from "dayjs";
import { DateRange } from "react-date-range";

export const SearchBar = ({ location }) => {
  const search = useContext(SearchContext);

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [guests, setGuests] = useState(search.guests);

  const [datesSelected, setDatesSelected] = useState(search.datesSelected);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCheckOut = dateRange[0]?.endDate || checkOut;
    search.saveSearchValues(
      destination,
      checkIn,
      selectedCheckOut,
      guests,
      datesSelected
    );
    navigate("/search");
  };

  const handleMinusCount = (guests) => {
    guests > 1 && setGuests(guests - 1);
  };

  const handlePlusCount = (guests) => {
    setGuests(guests + 1);
  };

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: checkIn ? new Date(checkIn) : new Date(),
      endDate: checkOut ? new Date(checkOut) : new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    const startDate = new Date(ranges.selection.startDate);
    const endDate = new Date(ranges.selection.endDate);

    setCheckIn(startDate);
    setCheckOut(endDate);
    setDateRange([ranges.selection]);
    setDatesSelected(true);
  };

  const clearSession = (e) => {
    e.preventDefault()
    sessionStorage.clear();
    setDestination("");
    setCheckIn(dayjs());
    setCheckOut(dayjs().add(1, "day"));
    setGuests(1);
    setDatesSelected(false);
  };

  return (
    <div key={location} className="w-8/12 relative">
      <form
        onSubmit={handleSubmit}
        className={`bg-white relative grid grid-cols-2 md:grid-cols-3 z-40 xl:grid-cols-4 divide-x items-center gap-4 p-2 md:p-3 md:py-2 rounded-full shadow-xl ${location === "search" ? "-mt-40" : "-mt-56"}`}
      >
        <div className="flex flex-row items-center flex-1  p-2">
          <FaLocationDot size={18} className="mr-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none ps-1 "
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="hidden md:flex p-2 gap-5 justify-center text-neutral-400 items-center">
          Guests
          <div className="text-xl flex gap-4 items-center">
            <FiMinusCircle
              className="cursor-pointer text-md"
              onClick={() => {
                handleMinusCount(guests);
              }}
            />
            <span>{guests}</span>
            <FiPlusCircle
              className="cursor-pointer"
              onClick={() => {
                handlePlusCount(guests);
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-10 justify-center relative text-neutral-400">
            <button
              className="flex flex-col justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              <span className="text-xs">Check in</span>
              {datesSelected
                ? dayjs(checkIn).format("DD/MM/YYYY")
                : "Add dates"}
            </button>
            <button
              className=" flex flex-col relative justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              <span className="text-xs">Check out</span>
              {datesSelected
                ? dayjs(checkOut).format("DD/MM/YYYY")
                : "Add dates"}
            </button>
          </div>
          {open && (
            <div className="bg-white">
            <div className="my-custom-calendar rdrMonth absolute z-50 top-16 bg-white">
              <DateRange
                minDate={new Date()}
                ranges={dateRange}
                onChange={handleSelect}
              />
            </div>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-1">
          <button className="bg-orange-400 text-white text-md font-medium px-6 py-3 rounded-full hover:bg-orange-500">
            Search
          </button>
          <button
            onClick={clearSession}
            className=" text-rose-500 text-md font-medium px-3 py-1 rounded-md"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
