import React from "react";
import { BsSearch } from "react-icons/bs";
import { useSearch } from "@/context/ProductsContextProvider";

const HeaderMain = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="py-6">
      <div className="sm:flex justify-between flex-row-reverse items-center">
        <div className="w-full relative ">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full max-w-full pr-10"
            type="text"
            placeholder="Enter any product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
