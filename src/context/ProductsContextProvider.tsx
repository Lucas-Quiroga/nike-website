"use client";

import React, { createContext, useState, useContext } from "react";

//tipo de estado para la búsqueda
type SearchState = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

//contexto de búsqueda
export const ProductContext = createContext<SearchState | undefined>(undefined);

const ProductsContextProvider = ({ children }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ProductContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsContextProvider;

// hook personalizado para acceder al estado de búsqueda
export const useSearch = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
