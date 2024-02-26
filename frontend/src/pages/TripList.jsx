import { useContext, useEffect, useState } from "react";
import * as apiClient from "../api-client";
import { Loader } from "../components/Loader";
import { UserContext } from "../contexts/UserContext";
import { BookedListingCard } from "../components/BookedListingCard";

export const TripList = () => {
  const {user} = useContext(UserContext)
  const [tripList, setTripList] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const getTripList = async () => {
    const res = await apiClient.fetchTripList(user?._id);
    setLoading(false)
    setTripList(res);
  };

  useEffect(() => {
    getTripList();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return(
  <>
  {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <span className="animate-spin-slow text-8xl">
            <Loader />
          </span>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold py-8">My Trips</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4 ">
        {tripList.length === 0 && <span className="text-lg mt-10">No trips were found.</span>}
          {tripList.map((trip) => (
            <BookedListingCard key={trip._id} listing={trip.listingId} startDate={trip.startDate} endDate={trip.endDate} totalPrice={trip.totalPrice} />
          ))}
        </div>
      </div>
      )}
  </>
  )
};
