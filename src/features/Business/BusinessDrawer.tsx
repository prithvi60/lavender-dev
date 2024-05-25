import React from 'react'
import FilterDrawer from './FilterDrawer';

const getDrawerComponent = (type) => {
    switch (type) {
        case 'FilterDrawer':
          return <FilterDrawer/>;
        default:
          return <div>Default</div>;
      }
}
function BusinessDrawer({type}) {
  return (
    <div className='w-80'>
        {getDrawerComponent(type)}
    </div>
  )
}

export default BusinessDrawer