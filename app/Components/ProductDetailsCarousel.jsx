import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState, useEffect } from "react";

const ProductDetailsCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    // TODO: add the CSS for productCrousel class in global css

    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        showArrows={false}
        autoPlay={true}
        interval={2000}
        className="productCarousel">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.attributes.url}
            alt={img.attributes.name}
          />
        ))}
        {/* <img src="/assets/p1.png" />
        <img src="/assets/p2.png" />
        <img src="/assets/p3.png" />
        <img src="/assets/p4.png" />
        <img src="/assets/p5.png" />
        <img src="/assets/p6.png" />
        <img src="/assets/p7.png" /> */}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
