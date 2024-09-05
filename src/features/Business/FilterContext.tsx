import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  statusFilter: string[];
  setStatusFilter: (text: string[]) => void;
  teamFilter: string;
  setTeamFilter: (text: string) => void;
  bookingFilter: string;
  setBookingFilter: (text: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statusFilter, setStatusFilter] = useState([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [bookingFilter, setBookingFilter] = useState("");


  return (
    <FilterContext.Provider value={{ statusFilter, setStatusFilter,teamFilter,setTeamFilter,bookingFilter, setBookingFilter}}>
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