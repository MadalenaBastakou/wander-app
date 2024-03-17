import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BookedListingCard } from "../components/BookedListingCard";

export const MyBookings = () => {

  const { data: listings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings,
  );

 

  return (
    <div className="h-screen">
        <div className="w-screen mx-auto bg-neutral-100 h-full p-4">
          <div className="container max-w-screen-2xl mx-auto h-full  bg-white rounded-xl shadow-sm">
          <h1 className="text-xl md:text-2xl text-gray-500 font-semibold ps-10 pt-8 pb-4 uppercase">My bookings</h1>
          <div className="mt-8 grid md:grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4 ">
        {!listings || listings.length === 0 && <span className="text-lg mt-10 ps-20">No bookings found</span>}
        </div>
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 mt-8 gap-10">
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
