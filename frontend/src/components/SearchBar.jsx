import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SearchContext } from "../contexts/SearchContext";
import { FaLocationDot } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


export const SearchBar = ({ location }) => {
  const search = useContext(SearchContext);

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(dayjs(search.checkIn ? dayjs(search.checkIn) : dayjs()));
  const [checkOut, setCheckOut] = useState(dayjs(search.checkOut ? dayjs(search.checkOut) : dayjs().add(1, 'day')));
  const [guests, setGuests] = useState(search.guests || 1);

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


  return (
    <div className="w-full ms-20 flex items-center justify-center">
    <div className="w-9/12 absolute">
      <form
        onSubmit={handleSubmit}
        className={`bg-white grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 divide-x items-center gap-4 p-2 md:p-3 md:py-2 rounded-full shadow-xl ${location === "search" ? "-mt-40" : "-mt-56"}`}
      >
        <div className="flex flex-row items-center flex-1  p-2  ">
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
        <div className="flex">
        <DemoContainer  components={["DatePicker"]}>
          <DatePicker
            disablePast
            sx={{
              width: 230,
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
                
              },
              ".MuiOutlinedInput-root" : {
                fontSize: "16px",
                overflow: "hidden",
                paddingX: "2px",
                marginX: "0",
                height:"40px",
                color:"grey",
              }
            }}
            value={checkIn || null}
            format="DD/MM/YYYY"
            onChange={(newCheckIn) => setCheckIn(newCheckIn ? newCheckIn.$d : null)}
          />

</DemoContainer>
  </div>
 
<DemoContainer components={["DatePicker"]}>
          <DatePicker
            disablePast
            sx={{
              width: 260,
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
                paddingX: "0",
                marginX: "0"
              },
              ".MuiOutlinedInput-root" : {
                fontSize: "16px",
                overflow: "hidden",
                paddingX: "2px",
                marginX: "0",
                height:"40px",
                color:"grey"
              }
            }}
            value={checkOut || null}
            format="DD/MM/YYYY"
            onChange={(newCheckOut) => setCheckOut(newCheckOut ? newCheckOut.$d : null)}
          />
          </DemoContainer>
        <div className="flex justify-center gap-1">
          <button className="bg-orange-400 text-white text-md font-medium px-6 py-3 rounded-full hover:bg-orange-500">
            Search
          </button>
          <button className=" text-rose-500 text-md font-medium px-3 py-1 rounded-md">
          Clear
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};
