"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EVENT_CATEGORIES } from "../../constant";
import { Badge } from "./ui/badge";

const CategoriesCards: React.FC = () => {
  const itemsPerSlide = 4;
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNextSlide = () => {
    const totalSlides = Math.ceil(EVENT_CATEGORIES.length / itemsPerSlide);
    setCurrentSlide((prevSlide) => (prevSlide % totalSlides) + 1);
  };

  const handlePreviousSlide = () => {
    if (currentSlide !== 1) {
      const totalSlides = Math.ceil(EVENT_CATEGORIES.length / itemsPerSlide);
      setCurrentSlide((prevSlide) =>
        prevSlide === 1 ? totalSlides : prevSlide - 1,
      );
    }
  };

  useEffect(() => {
    const handlePrevClick = () => {
      handlePreviousSlide();
    };

    const handleNextClick = () => {
      handleNextSlide();
    };

    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    if (prevButton) {
      prevButton.addEventListener("click", handlePrevClick);
    }

    if (nextButton) {
      nextButton.addEventListener("click", handleNextClick);
    }

    return () => {
      if (prevButton) {
        prevButton.removeEventListener("click", handlePrevClick);
      }
      if (nextButton) {
        nextButton.removeEventListener("click", handleNextClick);
      }
    };
  }, [handlePreviousSlide, handleNextSlide]);

  const transformValue = `translateX(-${(currentSlide - 1) * 100}%)`;

  return (
    <main className="padding-container max-container mt-20">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="relative flex w-full items-center">
        <Carousel>
          <CarouselContent
            style={{
              transform: transformValue,
              transition: "transform 0.1s ease",
            }}
          >
            {EVENT_CATEGORIES.map(
              (category, index) =>
                // Check if current index is divisible evenly by itemsPerSlide
                index % itemsPerSlide === 0 && (
                  <CarouselItem key={category.title + index} className="py-12">
                      <div className="grid md:gap-4 gap-4 grid-cols-2 md:grid-cols-4">
                        {/* Map the next four categories */}
                        {EVENT_CATEGORIES.slice(index, index + itemsPerSlide).map(
                          (category, subIndex) => (
                            <Card key={category.title + index + subIndex} className="my-11 md:my-0">
                              <div className="relative md:h-32 h-6">
                                <div className="h-full w-full cursor-pointer">
                                  <Image
                                    src={category.links}
                                    alt={category.title}
                                    layout="responsive"
                                    objectFit="cover"
                                    width={90}
                                    height={80}
                                  className="rounded-md transform transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <div className="absolute inset-x-0 md:top-28 top-16 flex justify-center font-bold text-white">
                                <CardHeader>
                                  <CardTitle className="flex cursor-pointer justify-center rounded-lg bg-black px-4 text-xs text-white md:text-xl">
                                    {category.title}
                                  </CardTitle>
                                </CardHeader>
                              </div>
                            </div>
                          </Card>
                        ),
                      )}
                    </div>
                  </CarouselItem>
                ),
            )}
          </CarouselContent>

          <Badge className="absolute right-0 top-0 mt-[-40px] flex items-center border border-slate-300 bg-white px-20 py-5" />
          <div className="absolute right-0 top-0 mr-16 mt-[-30px] flex items-center">
            <span>
              {currentSlide} of{" "}
              {Math.ceil(EVENT_CATEGORIES.length / itemsPerSlide)}
            </span>
            <CarouselPrevious
              id="prevButton"
              className="hover:bg-black hover:text-white"
            />
            <CarouselNext
              id="nextButton"
              className="hover:bg-black hover:text-white"
            />
          </div>
        </Carousel>
      </div>
    </main>
  );
};

export default CategoriesCards;
