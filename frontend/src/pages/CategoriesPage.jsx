import { useEffect, useState } from "react";
import { categories } from "../data.jsx";
import * as apiClient from "../api-client.js";
import { ListingCard } from "../components/ListingCard.jsx";
import { Loader } from "../components/Loader.jsx";

export const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const res = await apiClient.fetchListings(selectedCategory);
      setLoading(false);
      setListings(res);
    };
    getListings();
  }, [selectedCategory]);

  return (
    <div className="w-screen flex flex-wrap gap-8 py-4 px-8 mt-6 mx-auto">
      <div className="w-screen flex flex-wrap gap-8 py-4  mt-6 mx-auto text-gray-400">
        {categories.map((category, index) => (
          <label
            onClick={() => setSelectedCategory(category.label)}
            key={index}
            className={
              category.label === selectedCategory
                ? "text-orange-500 flex flex-col items-center gap-1 cursor-pointer"
                : "flex flex-col items-center gap-1 cursor-pointer"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={category.label}
            ></input>
            <span className="text-3xl">{category.icon}</span>
            <span>{category.label}</span>
          </label>
        ))}
      </div>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-start mt-40">
          <span className="animate-spin-slow text-8xl">
            <Loader />
          </span>
        </div>
      ) : (
        <div className="w-screen grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto md:gap-3 justify-center">
          {listings.length === 0 && <span className="text-lg mt-10">No matches found</span>}
          {listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
      )}
    </div>
  );
};
