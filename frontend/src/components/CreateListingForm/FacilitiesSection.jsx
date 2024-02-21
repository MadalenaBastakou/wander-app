import { useState } from "react";
import { facilities } from "../../data";
import { useFormContext } from "react-hook-form";

export const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

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

  return (
    <>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Tell guests what your place has to offer
      </h3>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-8 mb-8">
        {facilities.map((facility, index) => {
          return (
            <label
              key={index}
              className={`container overflow-hidden w-3/4 flex flex-col justify-center items-center gap-2 border-2 rounded whitespace-wrap p-4 cursor-pointer ${
                selectedAmenities.includes(facility.name)
                  ? "bg-neutral-200"
                  : "hover:border-orange-400"
              }`}
            >
              <input
                type="checkbox"
                value={facility.name}
                name="facility"
                className="hidden"
                onClick={handleCheckboxChange}
                {...register("facilities", {
                  validate: (selectedAmenities) => {
                    if (selectedAmenities && selectedAmenities.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is required";
                    }
                  },
                })}
              ></input>
              <span className="text-2xl">{facility.icon}</span>
              <span className="text-center">{facility.name}</span>
            </label>
          );
        })}
      </div>{" "}
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </>
  );
};
