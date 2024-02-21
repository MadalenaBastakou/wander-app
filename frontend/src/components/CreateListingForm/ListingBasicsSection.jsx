import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const LISTING_BASICS = ["Guests", "Bedrooms", "Beds", "Bathrooms"];

export const ListingBasicsSection = () => {
  return (
    <>
      <h3 className="font-medium text-lg text-neutral-500 py-4 mt-4 mb-3">
        Share some basics about your place
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {LISTING_BASICS.map((basic) => {
          return (
            <>
            <div className="flex flex-col md:flex-row justify-between items-center border rounded px-5 py-4 mb-4">
              <div className="flex gap-5 items-center">
                <span>{basic}</span>
                <div className="text-xl flex gap-4 items-center">
                  <FiMinusCircle />
                  <span> 1 </span>
                  <FiPlusCircle />
                </div>
              </div>
            </div>
            </>
          );
        })}
      </div>
    </>
  );
};
