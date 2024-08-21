import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  confirmedText: string[];
  setConfirmedText: (text: string[]) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [confirmedText, setConfirmedText] = useState([]);

  return (
    <FilterContext.Provider value={{ confirmedText, setConfirmedText }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};