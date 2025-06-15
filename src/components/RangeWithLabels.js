import React from "react";

const RangeWithLabels = () => {
  return (
    <div>
      <h3 className="text-xl mb-2">Minimum Rating:</h3>
      <input
        type="range"
        min={0}
        max="5"
        value="0"
        className="range range-info"
        step="1"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
};

export default RangeWithLabels;