import { createContext, useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""

console.log(STRIPE_PUB_KEY);

const initialUserState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  profileImagePath: null,
  wishList:[]
};

const UserContext = createContext(null);

const stripePromise = loadStripe(STRIPE_PUB_KEY)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const res = localStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
      setIsLoggedIn(true);
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout, stripePromise }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
