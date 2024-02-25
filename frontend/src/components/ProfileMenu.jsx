import { useContext, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
// import * as apiClient from "../api-client";
import { UserContext } from "../contexts/UserContext";


export const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
const {logout} = useContext(UserContext)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-400 flex justify-around items-center text-xl  rounded-full border py-2 px-2 shadow-sm hover:shadow-md"
      >
        {user?.profileImagePath[0] ? (
          <img
            className="object-fit rounded-full w-1/2"
            alt="profile-photo"
            src={user.profileImagePath}
          ></img>
        ) : (
          <div className="text-gray-400 border border-gray-400 rounded-full">
            {" "}
            <BsPersonFill className="text-2xl" />
          </div>
        )}
        <IoMdArrowDropdown />
      </button>
      {open && user.username && (
        <div className="flex flex-col gap-2 w-48 bg-white border-gray-400 rounded absolute top-14 right-0 ps-3 pe-12 py-3 text-base shadow-md z-10">
          <Link className="hover:text-gray-700" to="/profile" state={ {user: user }}>
            My profile
          </Link>
          <Link className="hover:text-gray-700" to="/my-listings">
            My Listings
          </Link>
          <Link className="hover:text-gray-700" to={`/${user._id}/trips`}>
            Trip List
          </Link>
          <Link className="hover:text-gray-700" to={`/${user._id}/wishList`}>
            Wish List
          </Link>
          <Link className="hover:text-gray-700" to="">
            Property List
          </Link>
          <Link className="hover:text-gray-700" to="">
            Reservation List
          </Link>
          <Link className="hover:text-gray-700" to="">
            Become a host
          </Link>
          <Link
            className="hover:text-gray-700"
            to="/login"
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
