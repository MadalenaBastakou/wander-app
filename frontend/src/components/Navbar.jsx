import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { useContext } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { UserContext } from "../contexts/UserContext";

export const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="w-full max-w-screen-3xl px-2 lg:px-8 mx-auto flex justify-between items-center text-lg z-40">
      <div className="container ">
        <span>
          <Link to="/">
            <img src={logo} alt="wander brand logo" />
          </Link>
        </span>
      </div>
      <div className="flex items-center space-x-7 uppercase tracking-wide">
            <Link
              className="hidden md:block text-gray-500 whitespace-nowrap text-md tracking-wide uppercase hover:bg-neutral-100 p-2 rounded-full"
              to="/search"
            >
              Listings
            </Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">
              <button className="bg-orange-400 text-white text-md font-medium px-3 py-1 rounded-md uppercase hover:bg-orange-500">
                SignUp
              </button>
            </Link>{" "}
          </>
        ) : (
          <>
            <Link
              className="hidden md:block text-gray-500 whitespace-nowrap text-md tracking-wide uppercase  hover:bg-neutral-100 p-2 rounded-full"
              to="/create-listing"
            >
              Become a host
            </Link>
            <ProfileMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
