import { createContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [listingId, setListingId] = useState("");

  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    guests,
    listingId = ""
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setGuests(guests);
    if (listingId) {
      setListingId(listingId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        guests,
        listingId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };