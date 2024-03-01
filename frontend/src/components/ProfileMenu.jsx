import { useContext, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout} = useContext(UserContext);


  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-400 flex justify-around items-center text-xl p-1 rounded-full border px-2 shadow-sm hover:shadow-md"
      >
        {user?.profileImagePath?.length === 0 ? (
          <div className="text-gray-400 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center">
            {" "}
            <BsPersonFill className="text-2xl" size={30}/>
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
        <div className="flex flex-col gap-2 w-48 bg-white border-gray-400 rounded absolute top-14 right-0 ps-3 pe-12 py-3 text-base shadow-md z-10">
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
          {/* <Link className="hover:text-gray-700" to="">
            Property List
          </Link> */}
          <Link className="hover:text-gray-700" to="">
            Reservation List
          </Link>
          <Link className="hover:text-gray-700" to="/create-listing">
            Become a host
          </Link>
          <Link
            className="hover:text-gray-700"
            to="/"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
