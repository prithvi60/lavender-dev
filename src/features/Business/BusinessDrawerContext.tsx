import React, { createContext, useContext, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BusinessDrawer from './BusinessDrawer';
import endpoint from '../../api/endpoints';

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [payload, setPayload] = useState(null);

  const openDrawer = (content, payloadProp = null) => {
    setContent(content);
    setPayload(payloadProp)
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setContent(null);

  };

  return (
    <DrawerContext.Provider value={{ isOpen, content, openDrawer, closeDrawer, payload }}>
        <SwipeableDrawer
            anchor={'right'}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
        >
            <BusinessDrawer type={content} payload={payload}/>
        </SwipeableDrawer>
      {children}
    </DrawerContext.Provider>
  );
};
