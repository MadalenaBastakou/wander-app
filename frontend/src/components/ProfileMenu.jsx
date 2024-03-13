import { useContext, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import { SearchContext } from "../contexts/SearchContext";
import dayjs from "dayjs";

export const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const search = useContext(SearchContext);

  const [setDestination] = useState(search.destination);
  const [setCheckIn] = useState(search.checkIn);
  const [setCheckOut] = useState(search.checkOut);
  const [setGuests] = useState(search.guests);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-400 flex justify-around items-center text-xl p-1 rounded-full border px-2 shadow-sm  hover:shadow-md"
      >
        {user?.profileImagePath?.length === 0 ? (
          <div className="text-gray-400 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center">
            {" "}
            <BsPersonFill className="text-2xl" size={30} />
          </div>
        ) : (
          <div className="w-12 h-12 flex justify-around items-center">
            <img
              className="object-cover rounded-full w-11 h-11"
              alt="profile-photo"
              src={user?.profileImagePath}
            />
          </div>
        )}
        <IoMdArrowDropdown />
      </button>
      {open && user && (
        <div className="animate-fade-down flex flex-col gap-2 w-48 bg-white  rounded absolute top-16 right-0 ps-3 pe-12 py-3 text-base shadow-md z-50 tracking-wide">
          <Link
            className="hover:text-gray-700"
            to="/profile"
            state={{ user: user }}
          >
            My profile
          </Link>
          <Link className="hover:text-gray-700" to="/my-listings">
            My Listings
          </Link>
          <Link className="hover:text-gray-700" to={`/${user._id}/bookings`}>
            My bookings
          </Link>
          <Link className="hover:text-gray-700" to={`/${user._id}/wishList`}>
            My favourites
          </Link>
          <Link className="hover:text-gray-700" to="/create-listing">
            Become a host
          </Link>
          <hr />
          <Link
            className="flex items-center gap-2 hover:text-gray-700"
            to="/"
            onClick={() => {
              logout();
              sessionStorage.clear();
              setDestination("");
              setCheckIn(dayjs());
              setCheckOut(dayjs().add(1, "day"));
              setGuests(1);
            }}
          >
            <IoLogOutOutline />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
