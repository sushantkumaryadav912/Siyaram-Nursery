import React from "react";
import Image from "next/image";

const SimpleSlider = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <Image
          src="/banner1.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[600px] max-md:h-[400px] max-sm:h-[300px]"
          alt="Banner 1"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <Image
          src="/banner2.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[600px] max-md:h-[400px] max-sm:h-[300px]"
          alt="Banner 2"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <Image
          src="/banner3.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[600px] max-md:h-[400px] max-sm:h-[300px]"
          alt="Banner 3"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <Image
          src="/banner4.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[600px] max-md:h-[400px] max-sm:h-[300px]"
          alt="Banner 4"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleSlider;