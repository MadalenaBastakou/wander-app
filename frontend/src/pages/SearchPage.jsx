import { useContext, useState } from "react";
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


export const SearchPage = () => {
  const search = useContext(SearchContext);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);


  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guests: search.guests.toString(),
    page: page.toString(),
    category: selectedCategory,
    type: selectedType,
    facilities: selectedFacilities,
    maxPrice: selectedPrice
  };

  const { data: listingData } = useQuery(
    ["searchListings", searchParams],
    async () => {
      const data = await apiClient.searchListings(searchParams);
      return data;
    }
  );

  const handleCategory = (e) => {
const category = e.target.value

setSelectedCategory(category)
  }

  const handleType = (e) => {
    const type = e.target.value
    
    setSelectedType(type)
      }

      const handleFacilities = (e) => {
        const facility = e.target.value

        setSelectedFacilities((prevFacilities) => e.target.checked ? [...prevFacilities, facility] : [...prevFacilities.filter((prevFacility) => prevFacility !== facility)])
      }

      const handlePriceChange = (newValue) => {
        if (!isNaN(newValue)) {
          setSelectedPrice(newValue);
        }
      };
      

      console.log(selectedPrice);

  return (
    <div>
      <Hero location={"search"} />
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            <CategoryFilter onChange={handleCategory}/>
            <TypesFilter onChange={handleType}/>
            <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilities}/>
            <PriceFilter selectedPrice={selectedPrice} onChange={handlePriceChange}/>
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="container mx-auto flex justify-between items-center">
            <span className="text-xl font-bold my-8">
              {listingData?.pagination.total} Listings found{" "}
              {search.destination ? `in ${search.destination}` : ""}
            </span>
            {/**TODO sort options */}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {listingData?.data.map((listing) => {
              return <ListingCard key={listing._id} listing={listing} />;
            })}
            
          </div>
        </div>
      </div>
        <div className="flex justify-center">
              <Pagination
                page={listingData?.pagination.page || 1}
                pages={listingData?.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            </div>
    </div>
  );
};
