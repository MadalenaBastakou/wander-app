import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { Loader } from "../components/Loader";
import { ListingCard } from "../components/ListingCard";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";

export const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const fetchListings = async () => {
    setLoading(true);
    const res = await apiClient.fetchUserListings();
    setListings(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async () => {
    await apiClient.deleteListing(deletingId);
    fetchListings();
  };

  const handleEdit = async (listingId) => {
    navigate(`/my-listings/edit-listing/${listingId}`);
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
        <div className="h-screen">
        <div className="w-screen mx-auto bg-neutral-100 h-full p-4">
          <div className="container max-w-screen-2xl mx-auto h-full  bg-white rounded-xl shadow-sm">
            <h1 className="text-xl md:text-2xl text-gray-500 font-semibold ps-10 pt-8 pb-4 uppercase">
              My Listings
            </h1>
            <div className="mt-4 grid md:grid-cols-2 gap-10 lg:grid-cols-3 xl:grid-cols-3 p-4">
              {listings.length === 0 && (
                <span className="text-lg mt-10 ps-16">No matches found.</span>
              )}
              {listings.map((listing) => (
                <div
                  className="border-2 border-dashed rounded-xl p-2 flex flex-col mx-auto relative hover:border-solid"
                  key={listing._id}
                  style={{ maxWidth: "calc(100% - 20px)" }}
                >
                  <ListingCard listing={listing} />
                  <div className="w-full absolute bottom-0 flex justify-between pe-4 py-2 mt-2 mx-auto">
                    <button
                      onClick={() => handleEdit(listing._id)}
                      className="text-2xl text-neutral-400 cursor-pointer"
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_3").showModal();
                        setDeletingId(listing._id);
                      }}
                      className="text-2xl text-neutral-400 cursor-pointer"
                    >
                      <RiDeleteBinLine />
                    </button>

                    <dialog
                      id="my_modal_3"
                      className="modal modal-bottom sm:modal-middle p-12 rounded-lg"
                    >
                      <DeleteModal
                        handleDelete={() => handleDelete(listing._id)}
                      >
                        Are you sure you want to delete this listing?
                      </DeleteModal>
                    </dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};
