"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <Slider {...settings}>
        <div>
          <Link href="/shop">
            <Image
              src="/banner1.png"
              width={1920}
              height={400}
              alt="Banner 1"
              className="w-full h-auto"
            />
          </Link>
        </div>
        <div>
          <Link href="/shop">
            <Image
              src="/banner2.png"
              width={1920}
              height={400}
              alt="Banner 2"
              className="w-full h-auto"
            />
          </Link>
        </div>
        <div>
          <Link href="/shop">
            <Image
              src="/banner3.png"
              width={1920}
              height={400}
              alt="Banner 3"
              className="w-full h-auto"
            />
          </Link>
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;