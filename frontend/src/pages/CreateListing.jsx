import { FormProvider, useForm } from "react-hook-form";

import { CategorySection } from "../components/CreateListingForm/CategorySection";
import { TypeSection } from "../components/CreateListingForm/TypeSection";
import { LocationSection } from "../components/CreateListingForm/LocationSection";
import { ListingBasicsSection } from "../components/CreateListingForm/ListingBasicsSection";
import { FacilitiesSection } from "../components/CreateListingForm/FacilitiesSection";
import { PhotoUploadSection } from "../components/CreateListingForm/PhotoUploadSection";
import { ListingInfoSection } from "../components/CreateListingForm/ListingInfoSection";
import * as apiClient from "../api-client";
import { useState } from "react";

export const CreateListing = () => {
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
  const formMethods = useForm();
  const { handleSubmit } = formMethods;


  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
   
    formData.append("category", formDataJson.category);
    formData.append("type", formDataJson.type);
    formData.append("street", formDataJson.street);
    formData.append("aptSuite", formDataJson.aptSuite);
    formData.append("city", formDataJson.city);
    formData.append("province", formDataJson.province);
    formData.append("country", formDataJson.country);
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

    apiClient.addListing(formData);
  
  });

  return (
    <div className="bg-neutral-50 w-screen flex-col gap-5 ">
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
            <ListingBasicsSection />
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
              >
                Create your listing
              </button>
            </span>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
