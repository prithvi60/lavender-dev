import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { SampleData } from './SampleData';
import OptionsModal from './OptionsModal';

function ServiceListItems() {
  const serviceTags = ['Features', 'Hair colouring', 'Highlights', 'Hair treatments', 'Haircuts', 'Manicures', 'Pedicures', 'Nail art', 'Nail extensions']

    const [isOptions, setIsOptions] = useState(false);
    //const [tabValue, setTabValue] = React.useState(serviceTags[0]);
    const [value, setValue] = React.useState(0);

    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  function handleClick(serviceOptions){
    if(serviceOptions > 0){
        setIsOptions(true);
    }
  }

  return (
        <div className='mx-4 md:mx-16 md:w-3/5 w-full'> {/* Adjusted margin for different screen sizes */}
          <div className='text-xl font-bold'>Services</div>
            <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons>
          {serviceTags.map((tag, index) => (
            <Tab key={tag} label={tag}  />
          ))}
        </Tabs>

          <List sx={{ width: '100%', maxWidth: '100%', maxHeight: 500, bgcolor: 'background.paper', overflowY: 'scroll' }}>
            {SampleData.map((item, index) => (
              <div key={index}> 
                <div className='text-2xl font-bold'>{item.categoryName}</div>
                
                {item.services.map((service, serviceIndex) => (
                  <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between' }} key={serviceIndex}> {/* Added key prop for each service */}
                    <div className='p-2'>
                      <div className='text-lg font-bold'>{service.serviceName}</div>
                      <div className='text-sm font-normal'>{service.serviceDuration}</div>
                      <div className='text-sm font-normal'>{service.serviceDescription}</div>
                      <div className='text-base font-medium'>
                      {
                        service.options.length > 0 
                        ? 'from $'+ service.startingPrice
                        : '$'+service.finalPrice
                      }
                      </div>
                    </div>
                    <div><OptionsModal props={service} /></div>
                  </ListItemButton>
                ))}
              </div>
            ))}
          </List>
        </div>
  )
}

export default ServiceListItems