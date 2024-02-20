import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar = () => {
  const [cookie] = useCookies();
  const [user, setUser] = useState({
    username: "",
    profileImagePath: "",
  });


  useEffect(() => {
    const cookieValue = Cookies.get("user");
    if (cookieValue) {
      const decodedCookieValue = JSON.parse(decodeURIComponent(cookieValue));
      const {username, profileImagePath} = decodedCookieValue
      setUser((prevUser) => ({...prevUser, username, profileImagePath}));
  }}, []);

  return (
    <div className="w-full px-2 lg:px-8 mx-auto flex justify-between items-center transparent text-lg">
      <div className="container ">
        <span>
          <Link to="/">
            <img src={logo} alt="wander brand logo" />
          </Link>
        </span>
      </div>
      <div className="flex items-center space-x-5 ">
        {Object.keys(cookie).length === 0 ? (
          <>
            <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              <button className="bg-orange-400 text-white text-md font-medium px-3 py-1 rounded-md hover:bg-orange-500">
                SignUp
              </button>
            </Link>{" "}
          </>
        ) : (
          <>
           <Link className="hidden md:block text-gray-500 whitespace-nowrap" to="/create-listing" >
              Become a host
            </Link>
            <ProfileMenu user={user}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
