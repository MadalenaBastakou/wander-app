import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { ListingCard } from "./ListingCard";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../sliderSettings";

export const LatestListings = () => {
  const selectedCategory = "All";
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const res = await apiClient.fetchListings(selectedCategory);
      setListings(res.reverse());
    };
    getListings();
  }, []);



  return (
    <div className="max-w-screen-2xl mb-12 justify-center">
      <div className="w-full ms-16">
        <Swiper {...sliderSettings}>
          <SliderButtons />
          <div className="flex flex-row gap-5 px-4 mx-auto">
            {listings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <ListingCard className="flex-1" listing={listing} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
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
