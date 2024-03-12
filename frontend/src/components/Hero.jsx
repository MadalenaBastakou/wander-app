export default function Hero({location}) {

  return (
    <>
      <div
        className={`${location === "search" ? "" : "hero-wave"} bg-heroImg bg-[center_top_-18rem] md:bg-[center_top_-18rem] bg-no-repeat bg-cover bg-fixed w-screen h-60 ${location === "search" ? "md:h-[16rem]" : "md:h-[20rem] lg:h-[30rem]"} opacity-95 `}
      >
        {" "}
        <div
          className={`bg-gradient-to-b from-blue-400 w-screen h-60 ${location === "search" ? "md:h-[16rem]" : "md:h-[20rem] lg:h-[30rem]"} opacity-40`}
        ></div>
        {/* <div className="flex justify-center">
          <input type="search" name="search" className="relative peer z-40 bg-white md:bg-[center_top_-18rem] w-12 h-12 rounded-full border cursor-pointer outline-none pl-12 pr-4 -mt-40 md:hidden focus:w-full focus:border-lime-300 focus:cursor-text focus:pl-16 focus:pr-4"></input>
      </div> */}
      </div>
    </>
  );
}
