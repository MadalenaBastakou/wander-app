import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { ListingCard } from "./ListingCard";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../sliderSettings";

export const LatestListings = () => {
 
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const res = await apiClient.fetchListings();
      setListings(res.reverse());
    };
    getListings();
  }, []);

  return (
    <Swiper {...sliderSettings}>
      <div >
        <SliderButtons />
      </div>
      {listings.map((listing) => (
        <SwiperSlide key={listing._id}>
          <ListingCard className="flex-1" listing={listing} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-between text-5xl">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt; </button>
    </div>
  );
};
