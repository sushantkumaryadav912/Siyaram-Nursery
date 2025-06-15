"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${inputValue}`);
  };

  return (
    <form
      onSubmit={(e) => handleSearch(e)}
      className="flex items-center gap-x-2 w-[500px] max-[1023px]:w-[350px] max-md:w-[250px] max-[573px]:w-[200px]"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search products..."
        className="input input-bordered w-full max-[573px]:text-sm"
      />
      <button type="submit">
        <FaMagnifyingGlass className="text-xl text-black" />
      </button>
    </form>
  );
};

export default SearchInput;