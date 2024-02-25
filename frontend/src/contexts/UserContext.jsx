import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const res = localStorage.getItem("user");
    setUser(JSON.parse(res));
    setIsLoggedIn(true)
    setIsLoading(false);
  }, []);

const logout = () => {
  localStorage.removeItem("user");
}

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
