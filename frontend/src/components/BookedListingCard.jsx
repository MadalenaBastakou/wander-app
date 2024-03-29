import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import * as apiClient from "../api-client";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteModal from "../components/DeleteModal";

export const BookedListingCard = ({ listing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(
    user?.wishList?.find((item) => item?._id === listing?._id)
  );
  const [deletingPaymentId, setDeletingPaymentId] = useState(null);

  const navigate = useNavigate();

  /**IMAGE SLIDERS */
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listing?.photos?.length) % listing?.photos?.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listing?.photos.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  /**ADD TO WISHLIST */
  const patchWishlist = async (userId, listingId) => {
    if (user?._id !== listing?.creator?._id) {
      const res = await apiClient.patchWishList(userId, listingId);
      setUser(res.rest);
      setIsLiked(res.liked);
    }
  };

  const handleDelete = async () => {
    apiClient.deleteBooking(deletingPaymentId);
    navigate(`/${user._id}/bookings`);
  };

  return (
    <div className="grid md:grid-cols-[1fr_3fr] relative">
      <div
        key={listing._id}
        className={`relative translate-x-[${currentIndex * 100}%] group w-80`}
      >
        <img
          src={listing.photos[`${currentIndex}`]}
          alt="listing-photo"
          className="md:w-80 md:h-64 rounded-xl object-cover cursor-pointer"
          onClick={() => navigate(`/my-listings/${listing._id}`)}
        />
        {isLiked ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              patchWishlist(user._id, listing._id);
            }}
            className={`absolute top-0 right-0 p-3 text-2xl text-white ${user?._id === listing.creator?._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={user?._id === listing.creator?._id}
          >
            <MdFavorite />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              patchWishlist(user._id, listing._id);
            }}
            className={`absolute top-0 right-0 p-3 text-2xl text-white ${user?._id === listing.creator?._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={user?._id === listing.creator?._id}
          >
            <MdFavoriteBorder />
          </button>
        )}
        {listing.photos.length > 1 && (
          <div className="hidden group-hover:flex w-full justify-between absolute top-[50%]">
            <div className="bg-neutral-100 rounded-full p-2 mx-2 cursor-pointer">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                className="text-md font-bold"
              >
                <GrPrevious />
              </span>
            </div>
            <div className="bg-white rounded-full p-2 mx-2 cursor-pointer">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
                className="text-md  font-bold"
              >
                <GrNext />
              </span>
            </div>
          </div>
        )}
        <div className=" flex justify-center items-center">
          <div className="flex absolute bottom-0 p-2 ">
            {listing.photos.map((_, slideIndex) => (
              <div
                className="flex justify-center items-center text-xl cursor-pointer"
                key={slideIndex}
              >
                <RxDotFilled
                  className={`transition-all text-white ${currentIndex === slideIndex ? "text-2xl" : "opacity-70"}`}
                  onClick={() => goToSlide(slideIndex)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[420px] gap-4 px-4 mt-2">
        {listing.province ? (
          <h3
            onClick={() => navigate(`/my-listings/${listing._id}`)}
            className="text-lg font-semibold my-3 cursor-pointer"
          >
            {listing.city}, {listing.province}, {listing.country}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold my-3">
            {listing.city}, {listing.country}
          </h3>
        )}
        {listing.bookings.map((booking) => (
          <div key={booking.paymentIntentId}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("my_modal_3").showModal();
                setDeletingPaymentId(booking.paymentIntentId);
              }}
              className="absolute top-0 right-0 text-2xl text-neutral-400 cursor-pointer"
            >
              <RiDeleteBinLine />
            </button>

            <dialog
              id="my_modal_3"
              className="modal modal-bottom sm:modal-middle p-12 rounded-lg"
            >
              <DeleteModal handleDelete={() => handleDelete(deletingPaymentId)}>
                Are you sure you want to delete this listing?
              </DeleteModal>
            </dialog>
            <div>
              <span className="font-bold mr-2 text-neutral-500">Dates:</span>
              <span>
                {new Date(booking.checkIn).toDateString()} -{" "}
                {new Date(booking.checkOut).toDateString()}
              </span>
            </div>
            <div>
              <span className="font-bold mr-2 text-neutral-500">Host:</span>
              <span>
                {` ${listing?.creator?.firstName} ${listing?.creator?.lastName}`}
              </span>
            </div>
          </div>
        ))}
        <div>
          <p className="flex md:absolute bottom-0 gap-2 text-md font-light py-8">
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
        </div>
      </div>
    </div>
  );
};
