import React from 'react'
import FilterDrawer from './Schedule/ScheduleDrawers/FilterDrawer';
import AppointmentEdit from './AppointmentEdit';
import AddMemberForm from './team/AddMemberForm';
import AddServicesForm from './services/AddServicesForm';
import AddCategoryForm from './services/AddCategoryForm';
import AppointmentDrawer from './Schedule/ScheduleDrawers/AppointmentDrawer';
import NewAppointmentDrawer from './Schedule/ScheduleDrawers/NewAppointmentDrawer';

interface BusinessDrawerProps {
  type: string;
  payload?: any
}

const getDrawerComponent = (type, payload) => {
    switch (type) {
        case 'FilterDrawer':
          return <FilterDrawer/>;
        // case 'AppointmentEdit':
        //   return <AppointmentEdit />;
        case 'addMember':
          return <AddMemberForm payload={payload}/>;
        case 'addServices':
          return <AddServicesForm payload={payload}/>;
        case 'addCategory':
          return <AddCategoryForm payload={payload}/>;
        case 'AppointmentDetails':
          return <AppointmentDrawer/>
        case 'NewAppointment':
          return <NewAppointmentDrawer payload={payload}/>
        default:
          return <div>Default</div>;
      }
}
function BusinessDrawer({type, payload}: BusinessDrawerProps) {
  return (
    <div className='w-80 h-full'>
        {getDrawerComponent(type, payload)}
    </div>
  )
}

export default BusinessDrawer