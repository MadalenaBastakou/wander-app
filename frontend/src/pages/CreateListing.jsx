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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";

export const CreateListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const steps = [
    "Tell us about your place",
    "Upload photos of your place",
    "Where is your place located",
    "What is the name of your place?",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <CategorySection />
            <hr />
            <TypeSection />
            <hr />
            <FacilitiesSection
              selectedAmenities={selectedAmenities}
              handleCheckboxChange={handleCheckboxChange}
            />
            <hr />
            <ListingBasicsSection
              handleMinusCount={handleMinusCount}
              handlePlusCount={handlePlusCount}
              guests={guests}
              bedrooms={bedrooms}
              beds={beds}
              bathrooms={bathrooms}
            />
          </>
        );
      case 2:
        return (
          <PhotoUploadSection
            photos={photos}
            handleUploadPhotos={handleUploadPhotos}
            handleDragPhoto={handleDragPhoto}
            handleRemovePhoto={handleRemovePhoto}
          />
        );
      case 3:
        return <LocationSection />;
      case 4:
        return <ListingInfoSection />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  const navigate = useNavigate();

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
  const [selectedAmenities, setSelectedAmenities] = useState([]);

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

  const handleCheckboxChange = (e) => {
    const amenity = e.target.value;
    if (e.target.checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    }
  };

  /**POST LISTING */

  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);
    const res = await apiClient.addListing(formData);
    if (res) {
      setSubmitting(false);
    }

    toast.success("Listing created successfully!");
    reset();
    setGuests(1);
    setBedrooms(1);
    setBeds(1);
    setBathrooms(1);
    setPhotos([]);
    setTimeout(() => {
      navigate("/my-listings");
      toast.dismiss();
    }, 2000);
  });


  return (
    <div className="w-screen h-full bg-neutral-100 p-2">
      <Toaster />
      <FormProvider {...formMethods}>
        <form >
          <div className="md:w-10/12 mx-auto p-4 mb-8 shadow-sm rounded-lg pb-2 bg-white">
            <div className="container horizontal mt-5">
              <Stepper steps={steps} currentStep={currentStep} />
              <div className="my-10 p-10">
                <StepperContext.Provider
                  value={{
                    userData,
                    setUserData,
                    finalData,
                    setFinalData,
                  }}
                >
                  {displayStep(currentStep)}
                </StepperContext.Provider>
              </div>
            </div>
            <StepperControl
              submitting={submitting}
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
              onSubmit={onSubmit}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
