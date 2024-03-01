import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BookedListingCard } from "../components/BookedListingCard";

export const MyBookings = () => {
  const { data: listings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!listings || listings.length === 0) {
    return <span>No bookings found</span>;
  }
  

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mt-6 ">My bookings</h1>
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-10">
          {listings.map((listing) => (
            <div
              className="border-2 border-dashed rounded-xl p-2 mx-auto hover:border-solid"
              key={listing._id}
            >
              <BookedListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};
