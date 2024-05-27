import React from 'react'
import FilterDrawer from './FilterDrawer';
import AppointmentEdit from './AppointmentEdit';
import AddMemberForm from './team/AddMemberForm';

interface BusinessDrawerProps {
  type: string;
  payload?: any
}

const getDrawerComponent = (type, payload) => {
    switch (type) {
        case 'FilterDrawer':
          return <FilterDrawer/>;
        case 'AppointmentEdit':
          return <AppointmentEdit />;
        case 'addMember':
          return <AddMemberForm />;
        default:
          return <div>Default</div>;
      }
}
function BusinessDrawer({type, payload}: BusinessDrawerProps) {
  return (
    <div className='w-80'>
        {getDrawerComponent(type, payload)}
    </div>
  )
}

export default React.memo(BusinessDrawer)