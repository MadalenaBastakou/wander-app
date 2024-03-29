export default function Hero({location}) {

  return (
    <>
      <div
        className={`${location === "search" ? "" : "hero-wave"} bg-heroImg bg-[center_top_-18rem] bg-no-repeat bg-cover bg-fixed w-screen h-[12rem] ${location === "search" ? "md:h-[16rem]" : "md:h-[20rem] lg:h-[30rem]"} opacity-95 `}
      >
        {" "}
        <div
          className={`bg-gradient-to-b from-blue-400 w-screen h-60 ${location === "search" ? "md:h-[16rem]" : "md:h-[20rem] lg:h-[30rem]"} opacity-40`}
        ></div>
      </div>
    </>
  );
}
