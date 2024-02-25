import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export const ListingBasicsSection = ({
  guests,
  bedrooms,
  beds,
  bathrooms,
  handleMinusCount,
  handlePlusCount,
}) => {
  return (
    <>
      <h3 className="font-medium text-lg text-neutral-500 py-4 mt-4 mb-3">
        Share some basics about your place
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Guests</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle
                className="cursor-pointer"
                onClick={() => {
                  handleMinusCount("Guests");
                }}
              />
              <span>{guests}</span>
              <FiPlusCircle
                className="cursor-pointer"
                onClick={() => {
                  handlePlusCount("Guests");
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Bedrooms</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle
                className="cursor-pointer"
                onClick={() => {
                  handleMinusCount("Bedrooms");
                }}
              />
              <span>{bedrooms}</span>
              <FiPlusCircle
                className="cursor-pointer"
                onClick={() => {
                  handlePlusCount("Bedrooms");
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Beds</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle
                className="cursor-pointer"
                onClick={() => {
                  handleMinusCount("Beds");
                }}
              />
              <span>{beds}</span>
              <FiPlusCircle
                className="cursor-pointer"
                onClick={() => {
                  handlePlusCount("Beds");
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border rounded px-5 py-4 mb-4">
          <div className="flex gap-5 items-center">
            <span>Bathrooms</span>
            <div className="text-xl flex gap-4 items-center">
              <FiMinusCircle
                className="cursor-pointer"
                onClick={() => {
                  handleMinusCount("Bathrooms");
                }}
              />
              <span>{bathrooms}</span>
              <FiPlusCircle
                className="cursor-pointer"
                onClick={() => {
                  handlePlusCount("Bathrooms");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
