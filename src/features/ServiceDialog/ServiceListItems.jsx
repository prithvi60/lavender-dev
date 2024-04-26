import React, {useState, useRef} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { SampleData } from './SampleData';
import OptionsModal from './OptionsModal';

function ServiceListItems({ serviceCategories }) {
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
    <div className='w-full mx-4 md:mx-16 md:w-11/12 '>
      <div className='text-xl font-bold'>Services</div>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
      >
        {serviceCategories.map((service, index) => (
          <Tab key={index} label={service.serviceTags[0]} value={index} />
        ))}
      </Tabs>

      <List ref={listRef} sx={{ width: '100%', maxWidth: '100%', maxHeight: 500, bgcolor: 'background.paper', overflowY: 'scroll' }}>
        {serviceCategories.map((item, index) => (
          <div key={index} id={`category-${index}`}>
            <div className='text-2xl font-bold'>{item.categoryName}</div>

            {item.services.map((service, serviceIndex) => (
              <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between' }} key={serviceIndex}>
                <div className='p-2'>
                  <div className='text-lg font-bold'>{service.serviceName}</div>
                  <div className='text-sm font-normal'>{service.serviceDuration}</div>
                  <div className='text-sm font-normal'>{service.serviceDescription}</div>
                  <div className='text-base font-medium'>
                    {service.options.length > 0
                      ? 'from $' + service.startingPrice
                      : '$' + service.finalPrice}
                  </div>
                </div>
                <div><OptionsModal props={service} /></div>
              </ListItemButton>
            ))}
          </div>
        ))}
      </List>
    </div>
  );
}

export default ServiceListItems;