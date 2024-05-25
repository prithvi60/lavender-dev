import React, { createContext, useContext, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BusinessDrawer from '../features/Business/BusinessDrawer';

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  console.log("inside drawer context")

  const openDrawer = (content) => {
    console.log("inside opendrawer",content)
    setContent(content);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, content, openDrawer, closeDrawer }}>
        <SwipeableDrawer
            anchor={'right'}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
        >
            <BusinessDrawer type={content}/>
        </SwipeableDrawer>
      {children}
    </DrawerContext.Provider>
  );
};
