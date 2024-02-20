import { categories, types } from "../data";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
// import {useForm} from "react-hook-form"

export const CreateListingStep1 = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   watch,
  //   reset,
  // } = useForm();

  return (
    <div>
      <h2 className="font-semibold text-xl py-3">
        Step 1: Tell us about your place
      </h2>
      <hr />
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Which of these categories best describes your place?
      </h3>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-8 mb-8">
        {categories.map((category) => {
          return (
            <div
              key={category.label}
              className="container overflow-hidden w-3/4 flex flex-col justify-center items-center gap-2 border rounded whitespace-wrap p-4"
            >
              <div className="text-2xl">{category.icon}</div>
              <span className="text-center">{category.label}</span>
            </div>
          );
        })}
      </div>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        What type of place will guests have?
      </h3>
      <div className="mb-8">
        {types.map((type) => {
          return (
            <div
              key={type.name}
              className="container overflow-hidden w-full md:w-4/5 flex justify-between items-center border rounded p-4 mb-4"
            >
              <div>
                <div className="font-medium">{type.name}</div>
                <div className="text-sm">{type.description}</div>
              </div>
              <div className="text-2xl">{type.icon}</div>
            </div>
          );
        })}
      </div>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Where is your place located?
      </h3>
      <div>
        <div className="flex flex-col gap-3 mb-8">
          <label htmlFor="street"> </label>
          Street Address
          <input
            className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            type="text"
            id="street"
         
            
          />
          <label htmlFor="apartment"></label>
          Apartment, Suite, etc.(if applicable)
          <input
            className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            type="text"
            id="apartment"
          />
          <label htmlFor="city"></label>
          City
          <input
            className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            type="text"
            id="city"
          />
          <label htmlFor="province"> </label>
          Province
          <input
            className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            type="text"
            id="province"
          />
          <label htmlFor="country"></label>
          Country
          <input
            className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            type="text"
            id="country"
          />
        </div>
      </div>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        Share some basics about your place
      </h3>
      <div className="grid grid-cols-auto gap-4">
        <div className="container flex justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Guests</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle />
              <span> 1 </span>
              <FiPlusCircle />
            </div>
          </div>
        </div>
        <div className="container  flex justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Bedrooms</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle />
              <span> 1 </span>
              <FiPlusCircle />
            </div>
          </div>
        </div>
        <div className="container  flex justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Beds</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle />
              <span> 1 </span>
              <FiPlusCircle />
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-between items-center border rounded px-5 py-4 mb-4">
        <div className="flex gap-5 items-center">
          <span>Bathrooms</span>
          <div className="text-xl flex gap-4 items-center">
            <FiMinusCircle />
            <span> 1 </span>
            <FiPlusCircle />
          </div>
        </div>
      </div>
    </div>
  );
};
