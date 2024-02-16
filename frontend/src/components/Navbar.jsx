import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import {useSelector} from "react-redux"

const Navbar = () => {
  const user = useSelector((state) => state.user)
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
        <Link to="/login" className="text-white">
          Login
        </Link>
       {user ?  <Link to="/signup">
          <button className="bg-orange-400 text-white text-md font-medium px-3 py-1 rounded-md hover:bg-orange-500">
            SignUp
          </button>
        </Link> : 
          <button className="bg-orange-400 text-white text-md font-medium px-3 py-1 rounded-md hover:bg-orange-500">
            Logout
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
