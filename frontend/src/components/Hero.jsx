import { SearchBar } from "./SearchBar";
export default function Hero({ location }) {
  return (
    <>
      <div
        className={`${location === "search" ? "" : "hero-wave"} relative bg-heroImg bg-[center_top_-18rem] md:bg-[center_top_-18rem] bg-no-repeat bg-cover bg-fixed w-screen h-60 ${location === "search" ? "md:h-[16rem]" : "md:h-[30rem]"} opacity-95 z-0 relative`}
      >
        {" "}
        <div
          className={`bg-gradient-to-b from-blue-400 w-screen h-60 ${location === "search" ? "md:h-[16rem]" : "md:h-[30rem]"} opacity-40`}
        ></div>
        <div className="shapedividers_com-7371"></div>
      </div>
      <SearchBar location={location} />
    </>
  );
}
