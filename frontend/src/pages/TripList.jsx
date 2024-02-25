import { useContext, useEffect, useState } from "react";
import * as apiClient from "../api-client";
import { useLocation } from "react-router-dom";
import { ListingCard } from "../components/ListingCard";
import { Loader } from "../components/Loader";
import { UserContext } from "../contexts/UserContext";

export const TripList = () => {
  const [tripList, setTripList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { state } = useLocation();
  const { user } = useContext(UserContext);
  console.log(user);
  const wishlist = user.wishList
  
  // const { user } = state;

  console.log(wishlist);


  // const getTripList = async () => {
  //   const res = await apiClient.fetchTripList(user._id);
  //   console.log(res);
  //   setLoading(false)
  //   setTripList(res);
  // };

  // useEffect(() => {
  //   getTripList();
  // }, []);

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
          {/* {user.wishList.length === 0 && <span className="text-lg mt-10">No trips were found.</span>} */}
          {/* {user.wishlist.map((trip) => (
            <ListingCard key={trip._id} listing={trip.listingId} />
          ))} */}
        {/* {tripList.length === 0 && <span className="text-lg mt-10">No trips were found.</span>}
          {tripList.map((trip) => (
            <ListingCard key={trip._id} listing={trip.listingId} />
          ))} */}
        </div>
      </div>
      )}
  </>
  )
};
