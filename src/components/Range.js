import React from "react";

const Range = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="text-xl mb-2">Price</h3>
      <div>
        <input type="range" min={0} max={100} value="50" className="range" />
        <span>Max price: $50</span>
      </div>
    </div>
  );
};

export default Range;