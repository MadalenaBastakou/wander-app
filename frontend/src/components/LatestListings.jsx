import { useState, useEffect } from "react";
import * as apiClient from "../api-client"
import { ListingCard } from "./ListingCard";


export const LatestListings = () => {
    const selectedCategory = "All"
  const [listings, setListings] = useState([]);
  const latestListings = listings.reverse().slice(0, 5)

  useEffect(() => {
    const getListings = async () => {
      const res = await apiClient.fetchListings(selectedCategory);
      setListings(res);
    };
    getListings();
  }, []);


  return (
    <div className="flex flex-row gap-5 px-4">{latestListings.map((listing) => (<ListingCard className="flex-1" key={listing._id} listing={listing}/>))}</div>
  )
}
