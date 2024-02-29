import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { FaLocationDot } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const SearchBar = ({location}) => {
  const search = useContext(SearchContext);

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [guests, setGuests] = useState(search.guests);

  const [cleared, setCleared] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleSubmit = (e) => {
    e.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, guests);
    navigate("/search");
  };

  const handleMinusCount = (guests) => {
    guests > 1 && setGuests(guests - 1);
  };

  const handlePlusCount = (guests) => {
    setGuests(guests + 1);
  };

//   const minDate = new Date();
//   const maxDate = new Date();
//   maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="container flex justify-center items-center mx-auto absolute">
      <form
        onSubmit={handleSubmit}
        className= {`bg-white grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 items-center gap-4 p-2 md:p-3 rounded-full shadow-xl mx-auto ${location === "search" ? "-mt-64": "-mt-96"}`}
      >
        <div className="flex flex-row items-center flex-1  p-2  ">
          <FaLocationDot size={18} className="mr-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none border-r-2"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="flex p-2 border-r-2 gap-5  items-center text-neutral-400">
          Guests
          <div className="text-xl flex gap-4 items-center">
            <FiMinusCircle
              className="cursor-pointer"
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
        <div className="flex text-neutral-400">
          <DatePicker
            label="Check-in date"
            sx={{
              width: 260,
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            disablePast
            onChange={(date) => {
              setCheckIn(dayjs(date).format("DD/MM/YYYY"));
            }}
          />
        </div>
        <div>
          <DatePicker
            label="Check-out date"
            disablePast
            sx={{
              width: 260,
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            format="DD - MM - YYYY"
            onChange={(date) => setCheckOut(dayjs(date).format("DD/MM/YYYY"))}
          />
        </div>
        {/* <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full border-r-1"
            /> */}
        {/* <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className=" bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            /> */}
        <div className="flex justify-center gap-1">
          <button className="bg-orange-400 text-white text-md font-medium px-6 py-3 rounded-md hover:bg-orange-500">
            Search
          </button>
          <button className="bg-blue-400 text-white text-md font-medium px-3 py-1 rounded-md hover:bg-orange-500">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
