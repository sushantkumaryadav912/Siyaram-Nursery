import React from "react";
import StockAvailabillity from "./StockAvailabillity";
import ColorInput from "./ColorInput";
import QuantityInput from "./QuantityInput";
import SingleProductRating from "./SingleProductRating";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";
import BuyNowSingleProductBtn from "./BuyNowSingleProductBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";

const SingleProductDynamicFields = ({ product, quantityCount, setQuantityCount, slug }) => {
  return (
    <div className="flex flex-col gap-y-5 max-[500px]:items-center">
      <StockAvailabillity inStock={product?.inStock} />
      <SingleProductRating productRating={product?.rating} />
      <ColorInput />
      <QuantityInput
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
      />
      <div className="flex gap-x-5 max-[500px]:flex-col max-[500px]:gap-y-5 max-[500px]:w-full">
        <AddToCartSingleProductBtn
          product={product}
          quantityCount={quantityCount}
        />
        <BuyNowSingleProductBtn
          product={product}
          quantityCount={quantityCount}
        />
      </div>
      <AddToWishlistBtn product={product} slug={slug} />
    </div>
  );
};

export default SingleProductDynamicFields;