import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import * as apiClient from "../api-client";
import { Loader } from "../components/Loader";
import { ListingCard } from "../components/ListingCard";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";

export const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate()

  const fetchListings = async () => {
    setLoading(true);
    const res = await apiClient.fetchUserListings();
    setListings(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
   apiClient.deleteListing(listingId);
    fetchListings();
  };

  const handleEdit = async (listingId) => {
  navigate(`/my-listings/edit-listing/${listingId}`)
   };

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <span className="animate-spin-slow text-8xl">
            <Loader />
          </span>
        </div>
      ) : (
        <div className="w-screen mx-auto">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold py-8">My Listings</h1>
            <div className="mt-8 grid md:grid-cols-2 gap-10 lg:grid-cols-3 xl:grid-cols-3">
              {listings.length === 0 && (
                <span className="text-lg mt-10">No matches found.</span>
              )}
              {listings.map((listing) => (
                <div
                  className="border-2 border-dashed rounded-xl p-2 flex flex-col mx-auto relative hover:border-solid"
                  key={listing._id}
                >
                  <ListingCard listing={listing} />
                  <div className="w-full absolute bottom-0 flex justify-between pe-4 py-2 mt-2 mx-auto">
                  <button
                    onClick={() => handleEdit(listing._id)}
                    className="text-2xl text-neutral-400 cursor-pointer"
                  >
                 < MdOutlineModeEdit />
                 </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="text-2xl text-neutral-400 cursor-pointer"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
