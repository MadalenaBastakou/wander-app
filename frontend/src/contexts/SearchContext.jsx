import { createContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(() => {
    const storedCheckIn = sessionStorage.getItem("checkIn")
    return storedCheckIn ? new Date(storedCheckIn) : new Date()
  });
  const [checkOut, setCheckOut] = useState(
    () => {
      const storedCheckOut = sessionStorage.getItem("checkOut");
      return storedCheckOut ? new Date(storedCheckOut) : new Date();
  }
  );
  const [guests, setGuests] = useState(
    () => parseInt(sessionStorage.getItem("guests")) || 1)
  const [listingId, setListingId] =
    useState(() => sessionStorage.getItem("listingId")) || "";
    const [datesSelected, setDatesSelected] = useState(false)

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
    setDatesSelected(true)
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
        datesSelected,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };
