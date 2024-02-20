import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const coverInfo = [
  { name: "Villas", url: "bg-Villas", link: "" },
  { name: "Apartments", url: "bg-Apartments", link: "" },
  { name: "Houses", url: "bg-Houses", link: "" },
  { name: "Cottages", url: "bg-Cottages", link: "" },
];

export default function CategoriesCover() {
  return (
    <div className="w-screen flex flex-col md:flex-row h-96 md:h-[32rem] mx-auto md:pb-12 mt-8 mb-16">
      {coverInfo.map((cover) => {
        return (
          <div
            key={cover.name}
            className={`flex-1 ${cover.url} bg-cover bg-center relative`}
          >
            <Link to={cover.link}>
              <div className="bg-gradient-to-t from-black h-full opacity-20"></div>
              <div className="w-full absolute bottom-0 flex justify-between items-center">
                <h4 className="flex items-center px-6 py-2 text-white text-2xl">
                  {cover.name}
                </h4>
                <span className="text-white text-2xl px-6">
                  <FaArrowRightLong />
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
