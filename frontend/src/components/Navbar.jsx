import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import * as apiClient from "../api-client";

const Navbar = () => {
  const [cookie] = useCookies();
  const [user, setUser] = useState({
    username: "",
  });

  useEffect(() => {
    const cookieValue = Cookies.get("user");
    if (cookieValue) {
      const decodedCookieValue = decodeURIComponent(cookieValue);
      setUser(JSON.parse(decodedCookieValue));
    }
  }, []);

  return (
    <div className="w-full px-6 mx-auto flex justify-between items-center transparent absolute z-50 text-lg">
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
            <Link to="/login" className="text-white">
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
            <span>{`Hello, ${user.username}`}</span>
            <button
              onClick={() => {
                apiClient.logout();
              }}
              className="bg-orange-400 text-white text-md font-medium px-3 py-1 rounded-md hover:bg-orange-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
