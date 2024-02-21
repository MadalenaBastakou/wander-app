import { types } from "../../data";
import { useFormContext } from "react-hook-form";

export const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const typeWatch = watch("type");

  return (
    <>
      <h3 className="font-medium text-lg text-neutral-500 py-4 mt-4 mb-3">
        What type of place will guests have?
      </h3>
      <div className="mb-10 max-w-screen-md">
        {types.map((type, index) => {
          return (
            <label
              key={index}
              className={
                typeWatch === type.name
                  ? "container bg-neutral-200 overflow-hidden w-full md:w-4/5 flex justify-between items-center border-2 rounded p-4 mb-4 cursor-pointer"
                  : "container overflow-hidden w-full md:w-4/5 flex justify-between items-center border-2 rounded p-4 mb-4 cursor-pointer hover:border-orange-400"
              }
            >
              <input
                className="hidden"
                type="radio"
                value={type.name}
                name="type"
                {...register("type", { required: "This field is required" })}
              ></input>

              <div className="flex flex-col">
                <span className="font-medium">{type.name}</span>
                <span className="text-sm">{type.description}</span>
              </div>
              <div className="text-2xl">{type.icon}</div>
            </label>
          );
        })}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </>
  );
};
