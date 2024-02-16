import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex flex-col md:flex-row items-center justify-between w-screen md:py-4 my-4 h-48">
        <h2 className="md:flex-1 text-center text-xl md:text-3xl font-bold py-2">
          Discover our property selection
        </h2>
        <div className="flex-1 text-center md:text-left text-xs md:text-base text-zinc-400 tracking-wider px-10">
          Browse through a curated collection of stunning properties ranging
          from cozy apartments to luxurious villas, each meticulously selected
          to ensure a memorable stay. Whether you seek a beachfront retreat, a
          charming urban oasis, or a rustic countryside escape, Wander offers
          something for every traveler.{" "}
        </div>
      </div>
      <Categories />
      <div className="w-screen flex items-center justify-center  md:flex-row h-40 md:h-[24rem] mx-auto bg-footer bg-[center_-36rem] bg-no-repeat md:bg-center">
        <div className="absolute z-10 align-center flex flex-col gap-4">
          <p className="text-white text-2xl md:text-5xl text-center font-bold ">
            Unlocking doors to your dream house
          </p>
          <p className="text-sm md:text-2xl text-center text-neutral-200 tracking-wider">
            Welcome to a world where possibilities meet properties.
          </p>
          <Link to="/signup" className="text-center">
            <button className="bg-orange-400  text-sm md:text-2xl text-white font-medium px-10 py-3 rounded-md hover:bg-orange-500 hover:text-black">
              Get Started
            </button>
          </Link>
        </div>
        <div className="bg-black w-full h-full opacity-40 flex justify-center items-center relative"></div>
      </div>
    </div>
  );
}
