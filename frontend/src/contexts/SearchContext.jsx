import { createContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(
    () => new Date(sessionStorage.getItem("checkIn")) || new Date().toISOString
  );
  const [checkOut, setCheckOut] = useState(
    () => new Date(sessionStorage.getItem("checkOut")) || new Date().toISOString
  );
  const [guests, setGuests] = useState(
    () => parseInt(sessionStorage.getItem("guests")) || 1)
  const [listingId, setListingId] =
    useState(() => sessionStorage.getItem("listingId")) || "";

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
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("guests", guests.toString());

    if (listingId) {
      setListingId(sessionStorage.setItem("listingId", listingId))
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
