import React from 'react'
import FilterDrawer from './Schedule/ScheduleDrawers/FilterDrawer';
import AppointmentEdit from './AppointmentEdit';
import AddMemberForm from './team/AddMemberForm';
import AddServicesForm from './services/AddServicesForm';
import AddCategoryForm from './services/AddCategoryForm';

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
        case 'addServices':
          return <AddServicesForm />;
        case 'addCategory':
          return <AddCategoryForm payload={payload}/>;
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