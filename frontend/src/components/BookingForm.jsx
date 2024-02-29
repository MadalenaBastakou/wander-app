import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { Loader } from "./Loader";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { toast, Toaster } from "react-hot-toast";
import * as apiClient from "../api-client"

export const BookingForm = ({ currentUser, paymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const search  = useContext(SearchContext);
  const { listingId } = useParams();

  const { mutate: bookListing, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      toast.success("Booking Saved!")
    },
    onError: () => {
      toast.error("Error saving booking")
    },
  });

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      checkIn: search?.checkIn,
      checkOut: search?.checkOut,
      listingId: listingId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  if (!currentUser) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="animate-spin-slow text-8xl">
          <Loader />
        </span>
      </div>
    );
  }

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookListing({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <>
    <Toaster/>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-neutral-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm your details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-neutral-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-neutral-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-neutral-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your price summary</h2>
        <div className="bg-blue-100 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: €{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
        disabled={isLoading}
          className="bg-orange-400 text-white text-xl font-bold p-2 mb-2 rounded-md hover:bg-orange-500 disabled:bg-gray-500"
          type="submit"
        >
          {isLoading ? "Saving..." : " Confirm Booking" }
         
        </button>
      </div>
    </form>
    </>
  );
};
