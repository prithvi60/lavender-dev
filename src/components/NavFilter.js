import React from 'react';
import { Search } from "@mui/icons-material";

const NavFilter = () => {
  console.log('in navfilter')
  return (
    <div className='filtered-panel ml-auto'>
        <div className='filtered-items'>
        <p>Hair Coloring, Hair Dye</p>
        </div>
        <div className='filtered-items'>
        <p>Berwyn, Oak Park</p>
        </div>
        <div className='filtered-items'>
        <p>18-24 March 24</p>
        </div>
        <div className='filtered-items'>
        <p>6pm - 9pm +1</p> <div className='icon-wrapper'><Search /></div>
        </div>
    </div>
  );
};

export default NavFilter;