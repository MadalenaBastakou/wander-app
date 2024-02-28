import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import * as apiClient from "../api-client";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

export const ListingCard = ({ listing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(
    user?.wishList?.find((item) => item?._id === listing?._id)
  );

  useEffect(() => {
    const res = localStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    }
  }, [setUser]);

  // const isLiked = user?.wishList?.find((item) => item?._id === listing?._id);

  const navigate = useNavigate();

  /**IMAGE SLIDERS */
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listing.photos.length) % listing.photos.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listing.photos.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

console.log(user);

  /**ADD TO WISHLIST */
  const patchWishlist = async (userId, listingId) => {
    if (user?._id !== listing?.creator?._id) {
      try {
        const res = await apiClient.patchWishList(userId, listingId);
        console.log(res);
        setUser(res.rest);
        setIsLiked(res.liked);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="flex flex-col h-96 w-80 cursor-pointer"
      onClick={() => navigate(`/my-listings/${listing._id}`)}
    >
      <div
        key={listing._id}
        className={`relative translate-x-[${currentIndex * 100}%] group`}
      >
        <img
          src={listing.photos[`${currentIndex}`]}
          alt="listing-photo"
          className="w-80 h-64 rounded-xl object-cover "
        />
        {isLiked ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              patchWishlist(user?._id, listing?._id);
            }}
            className={`absolute top-0 right-0 p-3 text-2xl text-white ${user?._id === listing.creator?._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={user?._id === listing?.creator?._id}
          >
            <MdFavorite />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              patchWishlist(user?._id, listing?._id);
            }}
            className={`absolute top-0 right-0 p-3 text-2xl text-white ${user?._id === listing.creator?._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={user?._id === listing?.creator?._id}
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

      <div className="flex justify-between mt-2">
        {listing.province ? (
          <h3 className="text-sm font-medium">
            {listing.city}, {listing.province}, {listing.country}
          </h3>
        ) : (
          <h3 className="text-sm font-medium">
            {listing.city}, {listing.country}
          </h3>
        )}
      </div>
      <p className="text-sm text-neutral-500 font-light">{listing.category}</p>
      <p className="text-sm text-neutral-500 font-light">{listing.type}</p>
      <p className="text-sm font-bold">
        <span>€</span>
        {listing.price} <span className="font-normal">per night</span>
      </p>
    </div>
  );
};
