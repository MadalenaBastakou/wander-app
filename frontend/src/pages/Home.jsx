import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { LatestListings } from "../components/LatestListings";
import "swiper/css"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
const {isLoggedIn} = useContext(UserContext)

  return (
    <div>
      <section className="lg:pb-12">
      <Hero location="home"/>
      <div className="w-screen">
      <div className="w-10/12 md:w-7/12 lg:w-10/12 2xl:w-7/12 mx-auto">
      <SearchBar location="home"/>
      </div>
      </div>
      </section>
      <section className="w-screen flex justify-center mt-[6rem] md:mt-18 lg:mt-32 pb-4">
      <div className="flex flex-col lg:flex-row max-w-screen-2xl items-center justify-between gap-8 md:py-4 my-4 h-48 -z-10">
        <h2 className="animate-fade-right md:flex-1 text-center text-xl md:text-3xl font-bold py-2">
          Discover our property selection
        </h2>
        <div className="animate-fade-left flex-1">
        <div className="w-11/12 text-center lg:text-left text-sm md:text-base text-zinc-400 tracking-wider px-10">
          Browse through a curated collection of stunning properties ranging
          from cozy apartments to luxurious villas, each meticulously selected
          to ensure a memorable stay. Whether you seek a beachfront retreat, a
          charming urban oasis, or a rustic countryside escape, Wander offers
          something for every traveler.{" "}
        </div>
        </div>
        </div>
      </section>
      <div className="w-screen p-4 mt-2 md:mb-12">
      <div className="max-w-screen-2xl mx-auto">
      <LatestListings/>
      </div>
      </div>
      <footer className="w-screen flex items-center justify-center md:flex-row h-40 md:h-[20rem] mx-auto bg-footer bg-cover bg-no-repeat md:bg-center">
        <div className="absolute z-10 align-center flex flex-col gap-4">
          <p className="text-white text-lg md:text-3xl lg:text-5xl text-center font-bold">
            Unlocking doors to your dream house
          </p>
          <p className="text-xs md:text-xl lg:text-2xl text-center text-neutral-200 tracking-wider">
            Welcome to a world where possibilities meet properties.
          </p>
          <Link to={isLoggedIn? "/search" : "/signup"} className="text-center">
            <button className="bg-orange-400  text-sm md:text-xl lg:text-2xl text-white font-medium px-5 md:px-10 py-1 md:py-3 rounded-md hover:bg-orange-500">
              Get Started
            </button>
          </Link>
        </div>
        <div className="bg-blue-900 w-full h-full opacity-40 flex justify-center items-center relative"></div>
      </footer>
    </div>
  );
}
