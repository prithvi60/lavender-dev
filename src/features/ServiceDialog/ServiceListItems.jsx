import React, {useState, useRef} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { SampleData } from './SampleData';
import OptionsModal from './OptionsModal';
import { Divider } from '@mui/material';

function ServiceListItems({ serviceCategories }) {
  console.log("serviceCategories : ", serviceCategories)
  const listRef = useRef(null);
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    // Update the selected tab
    setValue(newValue);
    // Scroll to the top of the selected category
    const categoryRef = document.getElementById(`category-${newValue}`);
    if (categoryRef) {
      categoryRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='w-full gridServiceLayout  urbanist-font'>
      <div className='text-4xl font-semibold pl-6 pb-5'>Services</div>
      <Tabs
      className='serviceTabs'
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
      >
        {serviceCategories?.map((service, index) => (
          <Tab key={index} label={service?.services[0]?.serviceTags} value={index} />
        ))}
      </Tabs>

      <List ref={listRef} className='serviceGridList' sx={{ width: '100%', maxWidth: '100%', maxHeight: 500, bgcolor: 'background.paper', overflowY: 'auto' }}>
        {serviceCategories?.map((item, index) => (
          <div key={index} id={`category-${index}`}>
            <div className='text-2xl font-bold px-6 pt-4 pb-2'>{item?.categoryName}</div>

            {item.services.map((service, serviceIndex) => (
              <ListItemButton className='serviceList' sx={{ display: 'flex', justifyContent: 'space-between' }} key={serviceIndex}>
                <div className='p-2 w-4/5'>
                  <div className='text-lg font-semibold'>{service.serviceName}</div>
                  <div className='text-sm font-normal'>{service.serviceDuration}</div>
                  <div className='text-sm font-normal text-ellipsis text-nowrap overflow-hidden'>{service.serviceDescription}</div>
                  <div className='text-base'>
                    {service.options.length > 0
                      ? <span>from: <span className='font-bold'>${service.startingPrice}</span></span>
                      : '$' + <span className='font-bold'>$service.finalPrice</span>}
                  </div>
                </div>
                <div>
                  <OptionsModal props={service} />
                </div>
              </ListItemButton>
            ))}
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ServiceListItems;