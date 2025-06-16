import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

const SingleReview = () => {
  return (
    <article className="flex gap-x-5 items-start">
      <Image
        src="/randomuser.jpg"
        alt="user profile photo"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold">John Smith</p>
        <div className="flex gap-x-1">
          <FaStar className="text-custom-yellow" />
          <FaStar className="text-custom-yellow" />
          <FaStar className="text-custom-yellow" />
          <FaStar className="text-custom-yellow" />
          <FaStar className="text-custom-yellow" />
        </div>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          laborum! Maxime laborum sequi magni, exercitationem molestias maiores
          minima sunt nulla!
        </p>
      </div>
    </article>
  );
};

export default SingleReview;