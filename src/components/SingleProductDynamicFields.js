import React from "react";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";
import BuyNowSingleProductBtn from "./BuyNowSingleProductBtn";
import QuantityInput from "./QuantityInput";
import ColorInput from "./ColorInput";
import StockAvailability from "./StockAvailability";
import AddToWishlistBtn from "./AddToWishlistBtn";

const SingleProductDynamicFields = ({ product, quantityCount, setQuantityCount, slug }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <StockAvailability product={product} />
      <ColorInput />
      <QuantityInput quantityCount={quantityCount} setQuantityCount={setQuantityCount} />
      <div className="flex gap-x-5 max-[500px]:flex-col max-[500px]:gap-y-2 max-[500px]:w-full">
        <AddToCartSingleProductBtn product={product} quantityCount={quantityCount} />
        <BuyNowSingleProductBtn product={product} quantityCount={quantityCount} />
      </div>
      <AddToWishlistBtn product={product} slug={slug} />
    </div>
  );
};

export default SingleProductDynamicFields;