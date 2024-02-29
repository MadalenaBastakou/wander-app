import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BookingForm } from "../components/BookingForm";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { BookingDetailsSummary } from "../components/BookingDetailsSummary";
import { Loader } from "../components/Loader";
import {Elements} from "@stripe/react-stripe-js"


export const Booking = () => {
  const {stripePromise} = useContext(UserContext)
  const search = useContext(SearchContext);
  const { listingId } = useParams();

  const [numberOfNights, setNumbersOfNights] = useState(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumbersOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(listingId, numberOfNights.toString()),
    { enabled: !!listingId && numberOfNights > 0 }
  );

  const { data: listing } = useQuery(
    "fetchListing",
    () => apiClient.fetchListing(listingId),
    {
      enabled: !!listingId,
    }
  );

  if (!listing || !currentUser || !paymentIntentData) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="animate-spin-slow text-8xl">
          <Loader />
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg container mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 mt-20">
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          numberOfNights={numberOfNights}
          listing={listing}
        />
        {currentUser && paymentIntentData && (
          <Elements stripe={stripePromise} options={{clientSecret: paymentIntentData.clientSecret}}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
          </Elements>
        )}
      </div>
    </div>
  );
};
