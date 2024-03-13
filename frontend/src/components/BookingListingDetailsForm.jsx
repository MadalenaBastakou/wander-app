import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";

const BookingListingDetailsForm = ({ listing }) => {
  const { isLoggedIn } = useContext(UserContext);
  const search = useContext(SearchContext);
  const [dateRange, setDateRange] = useState([
    {
      startDate: search?.checkIn ? new Date(search.checkIn) : new Date(),
      endDate: search?.checkOut ? new Date(search.checkOut) : new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const start = new Date(dateRange[0]?.startDate);
  const end = new Date(dateRange[0]?.endDate);
  const dayCount =  Math.round(end - start) > 1 ?  Math.round(end - start) / (1000 * 60 * 60 * 24): 1

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    search.saveSearchValues(
      "",
      dateRange[0].startDate,
      dateRange[0].endDate,
      ""
    );
    navigate(`/listings/${listing._id}/booking`);
  };

  return (
    <div className="flex flex-col justify-center bg-neutral-100 p-4 rounded-xl mb-8">
      <div className="my-custom-calendar rdrMonth">
        <DateRange
          minDate={new Date()}
          ranges={dateRange}
          onChange={handleSelect}
        />
      </div>
      <div className="ps-4">
        {dayCount > 1 ? (
          <h2 className="text-md md:text-lg font-medium ">
            €{listing.price} x {dayCount} nights
          </h2>
        ) : (
          <h2 className="text-md md:text-lg font-medium ">
            €{listing.price} x {dayCount} night
          </h2>
        )}
        <h2 className="text-md md:text-xl font-semibold pt-4 pb-5">
          Total price: €{listing.price * dayCount}
        </h2>
        <p className="text-sm font-light pb-2">
          <span className="text-neutral-500">Start Date:</span>{" "}
          {dateRange[0].startDate.toDateString()}
        </p>
        <p className="text-sm font-light pb-8">
          <span className="text-neutral-500">End Date:</span>{" "}
          {dateRange[0].endDate.toDateString()}
        </p>
        <div className="flex justify-end pe-6">
          {isLoggedIn ? (
            <button
              className="bg-orange-400 text-white text-md md:text-xl font-medium px-12 p-3 mb-2 rounded-md hover:bg-orange-500"
              type="submit"
              onClick={handleSubmit}
            >
              BOOK
            </button>
          ) : (
            <button
              className="bg-orange-400 text-white text-xl font-medium px-12 p-3 mb-2 rounded-md hover:bg-orange-500"
              type="submit"
              onClick={() => {
                search.saveSearchValues(
                  "",
                  dateRange[0].startDate,
                  dateRange[0].endDate,
                  0
                );
                navigate("/login", { state: { from: location } });
              }}
            >
              Sign in to book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingListingDetailsForm;
