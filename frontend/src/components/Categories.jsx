import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="w-screen flex flex-col md:flex-row h-96 md:h-[32rem] mx-auto pb-12 mt-8 mb-16">
      <div className="flex-1 bg-villa bg-cover bg-center relative">
        <Link to="">
          <div className="bg-black  h-full opacity-10"></div>
          <div className="w-full absolute bottom-0 flex justify-between items-center">
            <h4 className="flex items-center px-6 py-2 text-white text-2xl">
              Villas
            </h4>
            <span className="text-white text-2xl px-6">
              <FaArrowRightLong />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex-1 bg-apartment bg-cover bg-center relative">
        <Link to="">
          <div className="bg-black  h-full opacity-20"></div>
          <div className="w-full absolute bottom-0 flex justify-between items-center">
            <h4 className="flex items-center px-6 py-2 text-white text-2xl">
              Apartments
            </h4>
            <span className="text-white text-2xl px-6">
              <FaArrowRightLong />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex-1 bg-house bg-cover bg-center relative">
        <Link to="">
          <div className="bg-black  h-full opacity-10"></div>
          <div className="w-full absolute bottom-0 flex justify-between items-center">
            <h4 className="flex items-center px-6 py-2 text-white text-2xl">
              Houses
            </h4>
            <span className="text-white text-2xl px-6">
              <FaArrowRightLong />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex-1 bg-cottage bg-cover bg-center relative">
        <Link to="">
          <div className="bg-black  h-full opacity-20"></div>
          <div className="w-full absolute bottom-0 flex justify-between items-center">
            <h4 className="flex items-center px-6 py-2 text-white text-2xl cursor-pointer">
              Cottages
            </h4>
            <span className="text-white text-2xl cursor-pointer px-6">
              <FaArrowRightLong />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
