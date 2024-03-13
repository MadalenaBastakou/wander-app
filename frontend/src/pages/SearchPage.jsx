import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import Hero from "../components/Hero";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { ListingCard } from "../components/ListingCard";
import { Pagination } from "../components/Pagination";
import { CategoryFilter } from "../components/CategoryFilter";
import { FacilitiesFilter } from "../components/FacilitiesFilter";
import { TypesFilter } from "../components/TypesFilter";
import { PriceFilter } from "../components/PriceFilter";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";
import { TbListSearch } from "react-icons/tb";
import { useMediaQuery } from "@react-hook/media-query";

export const SearchPage = () => {
  const search = useContext(SearchContext);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const [open, setOpen] = useState(isLargeScreen);

useEffect(() => {
  setOpen(isLargeScreen);
}, [isLargeScreen]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guests: search.guests.toString(),
    page: page.toString(),
    categories: selectedCategories,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice,
    sortOption,
  };

  const { data: listingData } = useQuery(
    ["searchListings", searchParams],
    async () => {
      const data = await apiClient.searchListings(searchParams);
      return data;
    }
  );

  if (!listingData) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="animate-spin-slow text-8xl">
          <Loader />
        </span>
      </div>
    );
  }

  const handleCategory = (e) => {
    e.preventDefault();
    const category = e.target.value;

    setSelectedCategories((prevCategories) =>
      e.target.checked
        ? [...prevCategories, category]
        : [
            ...prevCategories.filter(
              (prevCategory) => prevCategory !== category
            ),
          ]
    );
  };

  const handleType = (e) => {
    e.preventDefault();
    const type = e.target.value;

    setSelectedTypes((prevTypes) =>
      e.target.checked
        ? [...prevTypes, type]
        : [...prevTypes.filter((prevType) => prevType !== type)]
    );
  };

  const handleFacilities = (e) => {
    e.preventDefault();
    const facility = e.target.value;

    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : [
            ...prevFacilities.filter(
              (prevFacility) => prevFacility !== facility
            ),
          ]
    );
  };

  const handlePriceChange = (newValue) => {
    if (!isNaN(newValue)) {
      setSelectedPrice(newValue);
    }
  };

  const resetSearch = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedFacilities([]);
    setSelectedPrice(0);
    setSortOption("");
  };

  return (
    <div>
      <Hero location={"search"} />
      <div className="w-screen">
        <div className="w-10/12 md:w-7/12 lg:w-10/12 2xl:w-8/12 mx-auto">
          <SearchBar location="search" />
        </div>
      </div>
      <div className="w-screen px-3 flex justify-end">
        <button
          onClick={() => setOpen((prevChoice) => !prevChoice)}
          className="xl:hidden mt-32 md:mt-12 lg:mt-28 flex gap-1 items-center text-lg font-semibold border text-gray-400 border-neutral-400 p-2 mx-2 rounded-md"
        >
          <TbListSearch />
          Filters
        </button>
      </div>
      <div className={`w-screen grid grid-cols-1 xl:grid-cols-[280px_1fr] mt-2 xl:gap-5 xl:mt-24 2xl:mt-24 px-4`}>
       {open &&   <div className="rounded-lg border border-slate-300 p-5 h-fit xl:sticky top-10 mb-4">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                Filter by:
              </h3>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onChange={handleCategory}
              />
              <TypesFilter
                selectedTypes={selectedTypes}
                onChange={handleType}
              />
              <FacilitiesFilter
                selectedFacilities={selectedFacilities}
                onChange={handleFacilities}
              />
              <PriceFilter
                selectedPrice={selectedPrice}
                onChange={handlePriceChange}
              />
              <div className="flex justify-center">
                <button
                  onClick={resetSearch}
                  className="text-red-500 underline"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>}
        <div className=" flex-col flex-wrap relative pb-20">
          <div className="container w-1/2 md:w-full md:mx-auto gap-2 flex flex-col md:flex-row md:justify-between md:items-center ">
            <span className="text-xl font-bold md:mt-8 md:mb-12">
              {listingData?.pagination.total} Listings found{" "}
              {search.destination ? `in ${search.destination}` : ""}
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded-md mb-4"
            >
              <option value="">Sort By</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-16 mx-auto">
            {listingData?.data.map((listing) => {
              return <ListingCard key={listing._id} listing={listing} />;
            })}
          </div>
          <div className="absolute bottom-0 inset-x-2/4">
            <Pagination
              page={listingData?.pagination.page || 1}
              pages={listingData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};
