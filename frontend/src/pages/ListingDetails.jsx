import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { facilities } from "../data.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { Loader } from "../components/Loader.jsx";

export const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await apiClient.fetchListing(listingId);
      setLoading(false);
      setListing(res);
      const creator = await apiClient.fetchCreator(res.creator);
      setCreator(creator);
    };
    fetchListing();
  }, []);

  /*BOOKING CALENDAR*/
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-xl md:text-3xl font-bold py-8">{listing.title}</h1>
        <div></div>
      </div>
      <div className="flex flex-wrap gap-10 mt-10">
        {listing.photos.map((photo, index) => (
          <div key={index}>
            <img className="max-w-72" src={photo} alt="listing-photos" />
          </div>
        ))}
      </div>
      <h2 className="text-lg md:text-xl font-semibold py-8">
        {listing.type} in {listing.city}, {listing.province}, {listing.country}
      </h2>
      <p className="text-md font-light py-8">guests - bedroom - bed - bath</p>
      <hr />
      <div>
        {creator && (
          <div className="flex items-center gap-4">
            <img
              className="rounded-full w-12"
              src={creator.profileImagePath[0]}
              alt="profile picture"
            />
            <h3 className="text-md md:text-lg font-medium py-8">
              Hosted by {creator.firstName} {creator.lastName}
            </h3>
          </div>
        )}
      </div>
      <hr />
      <h3 className="text-md md:text-lg font-medium py-4">Description</h3>
      <p>{listing.description}</p>
      <hr />
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold py-8">
            What this place offers?
          </h2>
          <div className="pb-12">
            {listing.facilities.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="text-3xl">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold py-8">
            How long do you want to stay?
          </h2>
          <div>
            <DateRange
              className="pb-8"
              ranges={dateRange}
              onChange={handleSelect}
            />
            {dayCount > 1 ? (
              <h2 className="text-lg md:text-xl font-semibold ">
                €{listing.price} x {dayCount} nights
              </h2>
            ) : (
              <h2 className="text-lg md:text-xl font-semibold ">
                €{listing.price} x {dayCount} night
              </h2>
            )}
            <h2 className="text-lg md:text-xl font-semibold py-8">
              Total price: €{listing.price * dayCount}
            </h2>
            <p className="text-md font-light pb-2">
              Start Date: {dateRange[0].startDate.toDateString()}
            </p>
            <p className="text-md font-light pb-8">
              End Date: {dateRange[0].endDate.toDateString()}
            </p>
          </div>
          <button
        className="bg-orange-400 text-white text-xl font-medium px-12 py-3 mb-12 rounded-md hover:bg-orange-500"
        type="submit"
      >
        BOOKING
      </button>
        </div>
      </div>
    
    </div>
  );
};
