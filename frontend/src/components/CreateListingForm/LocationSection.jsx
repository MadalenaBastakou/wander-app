import { useFormContext } from "react-hook-form";

export const LocationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h3 className="font-medium text-lg text-neutral-500 py-4 mt-4 mb-3">
        Where is your place located?
      </h3>
      <div>
        <div className="flex flex-col gap-3 mb-8 max-w-screen-md">
          <div className="flex flex-col">
            <label htmlFor="street"> </label>
            Street Address
            <input
              className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
              type="text"
              id="streetAddress"
              {...register("street", {
                required: "This field is required",
              })}
            />
          </div>
          {errors.street && (
            <span className="text-red-500 text-sm font-bold">
              {errors.street.message}
            </span>
          )}
          <div className="flex gap-10">
            <div className="flex flex-col flex-1">
              <label htmlFor="apartment"></label>
              Apartment, Suite, etc.(if applicable)
              <input
                className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                type="text"
                id="apartment"
                {...register("aptSuite", {required: false}) }
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="city"></label>
              City
              <input
                className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                type="text"
                id="city"
                {...register("city", { required: "This field is required" })}
              />
            </div>
          </div>
          {errors.city && (
            <span className="text-red-500 text-sm font-bold">
              {errors.city.message}
            </span>
          )}
          <div className="flex gap-10">
            <div className="flex flex-col flex-1">
              <label htmlFor="province"> </label>
              Province
              <input
                className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                type="text"
                id="province"
                {...register("province", {required: false})}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="country"></label>
              Country
              <input
                className="border rounded py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                type="text"
                id="country"
                {...register("country", { required: "This field is required" })}
              />
            </div>
          </div>
          {errors.country && (
            <span className="text-red-500 text-sm font-bold">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
