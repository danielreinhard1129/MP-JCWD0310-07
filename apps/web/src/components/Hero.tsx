"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [searchClick, setSearchClick] = useState(false);
  const searchClickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchClickRef.current &&
        !searchClickRef.current.contains(event.target)
      ) {
        setSearchClick(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setSearchClick(!searchClick);
  };

  return (
    <section
      className="max-container padding-container flex justify-center gap-10 pb-40 md:gap-14 lg:py-28"
      style={{
        backgroundImage: `url('/bg-hero-crowd.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bottom-0 mt-20 flex flex-1 flex-col items-center md:bottom-24 md:mt-0 relative">
        <div className="bold-40 text-center xl:max-w-[600px] mb-10 font-sans">
          <h1 className="text-white">Unlock Your Next Experience</h1>
        </div>
        <p className="regular-24 bold-20 mt-4 text-center text-white xl:max-w-[500px] relative bottom-8 font-sans">
          Your gateway to unforgettable events is <span className="text-teal-300">just a click away! </span>
        </p>
        <div
          className="relative mt-4 flex items-center p-4 px-4"
          ref={searchClickRef}
        >
          <SearchIcon
            className={`absolute left-7 top-1/2 -translate-y-1/2 ${searchClick ? "text-red-400" : ""}`}
          />
          <Input
            className="mr-2 py-7 pl-14 pr-12 font-bold text-slate-700 md:pr-44"
            type="text"
            placeholder="What do you want to see?"
            onClick={handleClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
