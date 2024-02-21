import { categories } from "../../data";
import { useFormContext } from "react-hook-form";

export const CategorySection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const categoryWatch = watch("category");
  return (
    <>
      <h3 className="font-medium text-lg text-neutral-500 py-4 mt-4 mb-3">
        Which of these categories best describes your place?
      </h3>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mx-auto md:px-8 mb-10">
        {categories.map((category, index) => {
          return (
            <label
              key={index}
              className={
                categoryWatch === category.label
                  ? "bg-neutral-200 container overflow-hidden w-3/4 flex flex-col justify-center items-center gap-2 border-2 rounded whitespace-wrap p-4 cursor-pointer "
                  : "container overflow-hidden w-3/4 flex flex-col justify-center items-center gap-2 border-2 rounded whitespace-wrap p-4 cursor-pointer hover:border-orange-400"
              }
            >
              <input
                className="hidden"
                type="radio"
                value={category.label}
                {...register("category", {
                  required: "This field is required",
                })}
              ></input>
              <span className="text-2xl">{category.icon}</span>
              <span className="text-center">{category.label}</span>
            </label>
          );
        })}
      </div>
      {errors.category && (
        <span className="text-red-500 text-sm font-bold">
          {errors.category.message}
        </span>
      )}
    </>
  );
};
