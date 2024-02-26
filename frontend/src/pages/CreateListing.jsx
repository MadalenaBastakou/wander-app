import { FormProvider, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { CategorySection } from "../components/CreateListingForm/CategorySection";
import { TypeSection } from "../components/CreateListingForm/TypeSection";
import { LocationSection } from "../components/CreateListingForm/LocationSection";
import { ListingBasicsSection } from "../components/CreateListingForm/ListingBasicsSection";
import { FacilitiesSection } from "../components/CreateListingForm/FacilitiesSection";
import { PhotoUploadSection } from "../components/CreateListingForm/PhotoUploadSection";
import { ListingInfoSection } from "../components/CreateListingForm/ListingInfoSection";
import * as apiClient from "../api-client";
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../contexts/UserContext";

export const CreateListing = () => {
  const {setUser} = useContext(UserContext)
const navigate = useNavigate()

  /**UPLOAD LISTING PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /**LISTING BASICS */
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const handleMinusCount = (type) => {
    switch (type) {
      case "Guests": {
        guests > 1 && setGuests(guests - 1);
        break;
      }
      case "Bedrooms": {
        bedrooms > 1 && setBedrooms(bedrooms - 1);
        break;
      }
      case "Beds": {
        beds > 1 && setBeds(beds - 1);
        break;
      }
      case "Bathrooms": {
        bathrooms > 1 && setBathrooms(bathrooms - 1);
        break;
      }
    }
  };

  const handlePlusCount = (type) => {
    switch (type) {
      case "Guests": {
        setGuests(guests + 1);
        break;
      }
      case "Bedrooms": {
        setBedrooms(bedrooms + 1);
        break;
      }
      case "Beds": {
        setBeds(beds + 1);
        break;
      }
      case "Bathrooms": {
        setBathrooms(bathrooms + 1);
        break;
      }
    }
  };

  /**POST LISTING */

  const formMethods = useForm();
  const { handleSubmit, reset} = formMethods;
const [submitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (formDataJson) => {
    const formData = new FormData();

    formData.append("category", formDataJson.category);
    formData.append("type", formDataJson.type);
    formData.append("street", formDataJson.street);
    formData.append("aptSuite", formDataJson.aptSuite);
    formData.append("city", formDataJson.city);
    formData.append("province", formDataJson.province);
    formData.append("country", formDataJson.country);
    formData.append("guestCount", guests);
    formData.append("bedroomCount", bedrooms);
    formData.append("bedCount", beds);
    formData.append("bathroomCount", bathrooms);
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("price", formDataJson.price.toString());

    if (formDataJson.facilities.length > 0) {
      Array.from(formDataJson.facilities).forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
    }

    photos.forEach((photo) => {
      formData.append(`photos`, photo);
    });

    setSubmitting(true)
    const res = await apiClient.addListing(formData);
    if(res) {
      setSubmitting(false)
    }

    console.log(res);
  
   
    toast.success("Listing created successfully!");
    reset();
    setGuests(1);
    setBedrooms(1);
    setBeds(1);
    setBathrooms(1);
    setPhotos([]);
    setTimeout(() => {
      navigate('/my-listings')
    }, 2000);
  });

  return (
    <div className="bg-neutral-50 w-screen flex-col gap-5 ">
      <Toaster />
      <div className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold py-8">
        Publish your property
      </h1>
      <div className="bg-white  max-w-screen-xl px-8 py-4 mb-8 rounded-xl self-center mx-auto">
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <h2 className="font-semibold text-xl py-3">
              Step 1: Tell us about your place
            </h2>
            <hr />
            <CategorySection />
            <TypeSection />
            <LocationSection />
            <ListingBasicsSection
              handleMinusCount={handleMinusCount}
              handlePlusCount={handlePlusCount}
              guests={guests}
              bedrooms={bedrooms}
              beds={beds}
              bathrooms={bathrooms}
            />
            <h2 className="font-semibold text-xl py-3">
              Step 2: Make your place stand out
            </h2>
            <hr />
            <FacilitiesSection />
            <PhotoUploadSection
              photos={photos}
              handleUploadPhotos={handleUploadPhotos}
              handleDragPhoto={handleDragPhoto}
              handleRemovePhoto={handleRemovePhoto}
            />
            <ListingInfoSection />
            <span className="flex justify-end">
              <button
                className="bg-orange-400 text-white text-xl font-medium px-3 py-3 mt-4 rounded-md hover:bg-orange-500"
                type="submit"
                disabled={submitting ? true : false}
              >
               {submitting ? "Saving..." : "Create your listing"}
              </button>
            </span>
          </form>
        </FormProvider>
      </div>
      </div>
    </div>
  );
};
