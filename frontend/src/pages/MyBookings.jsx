import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BookedListingCard } from "../components/BookedListingCard";

export const MyBookings = () => {

  const { data: listings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings,
  );

 

  return (
    <div className="min-h-screen bg-neutral-100">
    <div className="w-screen mx-auto p-2 md:p-4">
    <div className="max-w-screen-2xl mx-auto  bg-white rounded-xl shadow-sm px-4 md:px-8 pb-8">
      <h1 className="text-xl md:text-2xl text-gray-500 font-semibold ps-4 pt-4 md:pt-8 pb-4 uppercase">My bookings</h1>
        {!listings || listings.length === 0 && <span className="ps-4">No bookings found</span>}
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-10">
          {listings?.map((listing) => (
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
      </div>
      </div>
  );
};
