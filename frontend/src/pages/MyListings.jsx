import { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import { Loader } from "../components/Loader";
import { ListingCard } from "../components/ListingCard";

export const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const res = await apiClient.fetchListings();
      console.log(res);
      setListings(res);
      setLoading(false);
    };
    fetchListings();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <span className="animate-spin-slow text-8xl">
            <Loader />
          </span>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold py-8">My Listings</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4 ">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
      )}
    </>
  );
};
