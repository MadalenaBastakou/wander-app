import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { facilities } from "../data.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Loader } from "../components/Loader.jsx";
import { BsPersonFill } from "react-icons/bs";
import { UserContext } from "../contexts/UserContext.jsx";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import { Tooltip } from "react-tooltip";
import Map from "../components/Map.jsx";
import BookingListingDetailsForm from "../components/BookingListingDetailsForm.jsx";

export const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const { listingId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const res = await apiClient.fetchListing(listingId);
      setLoading(false);
      setListing(res);
    };

    fetchListing();
  }, [setUser, listingId]);

  const isLiked = user?.wishList?.find((item) => item?._id === listing?._id);

  /**ADD TO WISHLIST */
  const patchWishlist = async (userId, listingId) => {
    if (user?._id !== listing.creator?._id) {
      try {
        if (!isLoggedIn) {
          return;
        }
        const res = await apiClient.patchWishList(userId, listingId);
        setUser(res.rest);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /*BOOKING CALENDAR*/
 
 
  const handleDelete = async (e, listing) => {
    apiClient.deleteListing(listing._id);
    navigate("/my-listings");
  };

  const handleEdit = async (listingId) => {
    navigate(`/my-listings/edit-listing/${listingId}`);
  };

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="animate-spin-slow text-8xl">
        <Loader />
      </span>
    </div>
  ) : (
    <div className="w-screen bg-neutral-100 pt-6 pb-2">
    <div
      className={`bg-white p-8 rounded-lg max-w-screen-xl mx-auto ${user._id === listing.creator._id ? "border-2 border-dashed rounded-xl p-8 mt-6 mb-12" : ""}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold py-4">{listing.title}</h1>
        <div className="text-xl font-medium">
          {!isLoggedIn && (
            <Tooltip id="my-tooltip" style={{ fontSize: "16px", zIndex: 10 }} />
          )}
          {listing.creator._id === user._id ? (
            <div className="flex justify-between items-center gap-4 px-4">
              <button
                onClick={() => handleEdit(listing._id)}
                className="text-2xl text-neutral-400 cursor-pointer"
              >
                <MdOutlineModeEdit />
              </button>
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="text-2xl text-neutral-400 cursor-pointer"
              >
                <RiDeleteBinLine />
              </button>
              <dialog
                id="my_modal_3"
                className="modal modal-bottom sm:modal-middle p-12 rounded-lg"
              >
                <DeleteModal handleDelete={(e) => handleDelete(e, listing)}>
                  Are you sure you want to delete this listing?
                </DeleteModal>
              </dialog>
            </div>
          ) : isLiked ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                patchWishlist(user._id, listingId);
              }}
              className={`flex items-center gap-3 p-3 text-2xl text-rose-500 ${user?._id === listing.creator?._id || !isLoggedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={user?._id === listing.creator?._id || !isLoggedIn}
            >
              <MdFavorite />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                patchWishlist(user?._id, listingId);
              }}
              className={`flex items-center gap-3 p-3 text-2xl  ${user?._id === listing.creator?._id || !isLoggedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={user?._id === listing?.creator?._id || !isLoggedIn}
            >
              {!isLoggedIn ? (
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={!isLoggedIn ? "Login to favorite" : ""}
                  data-tooltip-place="left"
                  data-tooltip-variant="dark"
                >
                  <MdFavoriteBorder />
                </a>
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
          {listing.photos.map((photo, index) => (
            <div className="relative max-h-96 overflow-hidden" key={index} >
              <img className="object-contain w-full h-full" src={photo} alt="listing-photos" />
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-semibold pt-12">
        {listing.type} in {listing.city}
        {listing.province && `,${listing.province}`}, {listing.country}
      </h2>
      <p className="flex gap-3 text-md font-light py-8">
        <span className="bg-neutral-200 p-2 rounded-full">
          {listing.guestCount > 1
            ? `${listing.guestCount} guests`
            : `${listing.guestCount} guest`}
        </span>{" "}
        <span className="bg-neutral-200 p-2 rounded-full">
          {listing.bedroomCount > 1
            ? `${listing.bedroomCount} bedrooms`
            : `${listing.bedroomCount} bedroom`}
        </span>{" "}
        <span className="bg-neutral-200 p-2 rounded-full">
          {listing.bedCount > 1
            ? `${listing.bedCount} beds`
            : `${listing.bedCount} bed`}
        </span>{" "}
        <span className="bg-neutral-200 p-2 rounded-full">
          {listing.bathroomCount > 1
            ? `${listing.bathroomCount} bathrooms`
            : `${listing.bathroomCount} bathroom`}
        </span>
      </p>
      <hr />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {listing?.creator.profileImagePath[0] !== "" &&
          listing?.creator?.profileImagePath?.length !== 0 ? (
            <img
              className="rounded-full object-cover w-12 h-12"
              src={listing.creator.profileImagePath[0]}
              alt="profile picture"
            />
          ) : (
            <div className="text-gray-400 border border-gray-400 rounded-full">
              {" "}
              <BsPersonFill className="text-2xl" />
            </div>
          )}
          <h3 className="text-md md:text-lg font-medium py-8">
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <div>
        {user._id !== listing.creator._id && <Link
            to={`mailto:${listing?.creator?.email}?subject=Regarding ${listing.title}`}
            className="bg-orange-400 text-white text-xl font-medium px-4 py-3 rounded-md hover:bg-orange-500"
          >
            Contact host
          </Link>}
        </div>
      </div>
      <hr />
      <h3 className="text-md md:text-lg font-semibold pt-8 pb-4">
        Description
      </h3>
      <p className="mb-12">{listing.description}</p>
      <hr />
      <div className="flex flex-col md:flex-row md: gap-24 justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold py-8">
            What this place offers?
          </h2>
          <div className="pb-12 grid md:grid-cols-2 gap-y-6 gap-x-26">
            {listing.facilities.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-4 py-2"
              >
                <div className="text-3xl">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        {listing.creator._id !== user._id && (
          <div>
            <h2 className="text-lg md:text-xl font-semibold py-8">
              How long do you want to stay?
            </h2>
           <BookingListingDetailsForm listing={listing}/>
          </div>
        )}
      </div>
      <Map
        street={listing?.address}
        city={listing?.city}
        country={listing?.country}
      />
    </div>
    </div>
  );
};
