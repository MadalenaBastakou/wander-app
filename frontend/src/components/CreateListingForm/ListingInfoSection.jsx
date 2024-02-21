import { useFormContext } from "react-hook-form";

export const ListingInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h3 className="font-medium text-lg py-4 mt-4 mb-2">
        What makes tour place attractive and exciting?
      </h3>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="title"
          type="text"
          placeholder="Title"
          {...register("title", {
            required: "This field is required",
          })}
        />
        {errors.title && (
          <span className="text-red-500 text-sm font-bold">
            {errors.title.message}
          </span>
        )}
        <label htmlFor="description">Description </label>
        <textarea
          className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
          id="description"
          type="text"
          placeholder="Description"
          {...register("description", {
            required: "This field is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm font-bold">
            {errors.description.message}
          </span>
        )}
   
        <label htmlFor="price">Price per night</label>
        <div className="flex gap-3 items-center">
          <span>E</span>
          <input
            className="border rounded py-2 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
            id="price"
            type="number"
            {...register("price", {
              required: "This field is required",
            })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm font-bold">
              {errors.price.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
