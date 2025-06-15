import React from "react";

const CustomButton = ({
  paddingX,
  paddingY,
  text,
  buttonType,
  customWidth,
  textSize
}) => {
  return (
    <button
      type={buttonType}
      className={`${customWidth !== "no" && `w-${customWidth}`} uppercase bg-white px-${paddingX} py-${paddingY} text-${textSize} border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2`}
    >
      {text}
    </button>
  );
};

export default CustomButton;