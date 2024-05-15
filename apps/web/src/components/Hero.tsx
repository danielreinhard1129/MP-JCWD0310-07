"use client";

import AutoComplete from "./AutoComplete";

const Hero = () => {
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
      <div className="relative bottom-0 mt-11 flex flex-1 flex-col items-center md:bottom-14 md:mt-0">
        <div className="bold-40 mb-10 text-center font-sans xl:max-w-[600px]">
          <h1 className="text-white">Unlock Your Next Experience</h1>
        </div>
        <p className="regular-24 bold-20 relative bottom-8 mt-6 max-w-[300px] text-center font-sans text-white xl:max-w-[550px]">
          Your gateway to unforgettable events is{" "}
          <span className="text-teal-400"> just a click away! </span>
        </p>

        <div className="md:pt-20 relative bottom-8 pt-12 md:bottom-12">
          <AutoComplete />
        </div>
      </div>
    </section>
  );
};

export default Hero;
