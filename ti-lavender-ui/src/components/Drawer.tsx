import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

type DrawerProps = { 
  drawerComp: any; 
  toggleState: boolean; 
  setToggleState: any; 
  children?: any | undefined
};
export default function SwipeableTemporaryDrawer({drawerComp, toggleState, setToggleState, children }: DrawerProps) {

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setToggleState(open)
    };


  return (
    <div>
        <React.Fragment key={'right'}>
          {/* <Button onClick={toggleDrawer(true)}>{'right'}</Button> */}
          <SwipeableDrawer
            anchor={'right'}
            open={toggleState}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {drawerComp}
            {children}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
