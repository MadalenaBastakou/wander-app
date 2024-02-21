import { createContext, useContext, useEffect, useState } from "react";
import * as apiClient from "../api-client";


const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const { isError } = useQuery("validateToken", apiClient.validateToken);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiClient.validateToken();
      setUser(res.user);
    };
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn: user ? true: false, user: user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
