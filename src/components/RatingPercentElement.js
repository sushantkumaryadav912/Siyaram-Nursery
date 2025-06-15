import React from "react";

const RatingPercentElement = ({ ratingNumber, ratingPercent }) => {
  return (
    <div className="flex items-center gap-x-2">
      <p>{ratingNumber} star</p>
      <progress
        className="progress progress-success w-56"
        value={ratingPercent}
        max="100"
      ></progress>
    </div>
  );
};

export default RatingPercentElement;