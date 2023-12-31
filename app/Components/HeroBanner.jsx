"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack, BiAr } from "react-icons/bi";

const HeroBanner = () => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        showIndicators={false}
        showThumbs={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] h-[30px] md:w-[50px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90">
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] h-[30px] md:w-[50px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90">
            <BiArrowBack className=" rotate-180 text-sm md:text-lg" />
          </div>
        )}
        infiniteLoop={true}
        autoPlay={true}
        interval={3500}
        showStatus={false}>
        <div>
          <img
            src="/assets/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            alt=""
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-black[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Shop Now
          </div>
        </div>
        <div>
          <img
            src="/assets/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            alt=""
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-black[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Shop Now
          </div>
        </div>
        <div>
          <img
            src="/assets/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            alt=""
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-black[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Shop Now
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
