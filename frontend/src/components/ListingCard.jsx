import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { GrPrevious, GrNext } from "react-icons/gr";

export const ListingCard = ({ listing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate()

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listing.photos.length) % listing.photos.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listing.photos.length);
  };


  return (
    <div onClick={() => navigate(`/my-listings/${listing._id}`)} className="flex flex-col h-96 w-80 cursor-pointer">
      <div
        key={listing._id}
        className={`relative translate-x-[${currentIndex * 100}%] group`}
      >
        <img
          src={listing.photos[`${currentIndex}`]}
          alt="listing-photo"
          className="w-80 h-64 rounded-xl "
        />
        {listing.photos.length > 1 && (
          <div className="hidden group-hover:flex w-full justify-between absolute top-[50%]">
            <div className="bg-neutral-100 rounded-full p-2 mx-2 cursor-pointer">
              <span onClick={goToPrevSlide} className="text-md font-bold">
                <GrPrevious />
              </span>
            </div>
            <div className="bg-white rounded-full p-2 mx-2 cursor-pointer">
              <span onClick={goToNextSlide} className="text-md  font-bold">
                <GrNext />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-2">
        <h3 className="text-sm font-medium">
          {listing.city}, {listing.province}, {listing.country}
        </h3>
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
