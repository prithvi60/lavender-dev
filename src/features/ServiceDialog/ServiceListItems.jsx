import React, {useState, useRef} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { SampleData } from './SampleData';
import OptionsModal from './OptionsModal';
import { Divider } from '@mui/material';
import Text from '../../components/Text';

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
    <div className='w-full gridServiceLayout  urbanist-font'>
      <Text sx={styles.heading} name={"Services"} align="left"/>
      {/* <Tabs
      className='serviceTabs'
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
      >
        {serviceCategories?.map((service, index) => (
          <Tab key={index} label={service?.services[0]?.serviceTags} value={index} />
        ))}
      </Tabs> */}

      <List ref={listRef} className='serviceGridList' sx={{ width: '100%', maxWidth: '100%', maxHeight: 500, bgcolor: 'background.paper', overflowY: 'auto' }}>
        {serviceCategories?.map((item, index) => (
          <div key={index} id={`category-${index}`}>
            <Text sx={styles.subHeading} name={item?.categoryName} align="left"/>

            {item.services.map((service, serviceIndex) => (
              <ListItemButton className='serviceList' sx={{ display: 'flex', justifyContent: 'space-between' }} key={serviceIndex}>
                <div className='p-2 w-4/5'>
                  <Text sx={styles.serviceName} name={service?.serviceName} align="left"/>
                  {
                    service?.options?.length > 0 && <Text sx={styles.duration} name={`${service?.options[0]?.duration} mins`} align="left"/>
                  }
                  <Text sx={styles.description} name={service?.serviceDescription} align="left"/>
                  
                  {/* <div className='text-base font-normal text-ellipsis text-nowrap overflow-hidden'>{service.serviceDescription}</div> */}
                  <div className='text-base'>
                    {service?.options?.length > 0
                      ? <span style={{color: '#808080'}}>from: <span className='font-bold' style={{color: '#4D4D4D', fontWeight: 700}}>${service.startingPrice}</span></span>
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


const styles={
  heading: {
    color: '#000000',
    fontSize: '36px',
    fontWeight: 600,
  },
  subHeading: {
    color: '#4D4D4D',
    fontSize: '28px',
    fontWeight: 700,
    paddingLeft: 2,
    paddingTop: 1,
  },
  serviceName:{
    color: '#4D4D4D',
    fontSize: '20px',
    fontWeight: 600,
    py: '2px'
  },
  startingPrice: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    py: '2px'
  },
  duration: {
    color: '#808080',
    fontSize: '16px',
    fontWeight: 400,
    py: '2px'
  },
  description: {
    color: '#808080',
    fontSize: '16px',
    fontWeight: 400,
    py: '2px'
  },
  btn: {
    padding: "10px 40px 10px 40px",
    borderRadius: '10px',
  }
}