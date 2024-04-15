import React, {useState} from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { SampleData } from './SampleData';
import TabContext from '@mui/lab/TabContext';
import Button from '../../components/Button';
import ScrollSpy from "react-ui-scrollspy";
import Navigation from './Navigation';
import LayoutContext from './LayoutContext';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import OptionsModal from './OptionsModal';

function ServiceListItems() {
  const serviceTags = ['Features', 'Hair colouring', 'Highlights', 'Hair treatments', 'Haircuts', 'Manicures', 'Pedicures', 'Nail art', 'Nail extensions']

    const [isOptions, setIsOptions] = useState(false);
    //const [tabValue, setTabValue] = React.useState(serviceTags[0]);


  function handleClick(serviceOptions){
    console.log('serviceOptions : ', serviceOptions)
    if(serviceOptions > 0){
        setIsOptions(true);
    }
  }
  const [isColumn, setIsColumn] = useState(true);
  const styleLayoutColumn = {
    flexDirection: isColumn ? 'column' : 'row',
  };
  return (
    <LayoutContext.Provider value={[isColumn, setIsColumn]}>
        <div className='mx-16 my-10'>
        <div className='text-xl font-bold'>Services</div>
        <Navigation/>

        <List sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}>
      {SampleData.map((item)=>(
        <div>
            <div className='text-2xl font-bold'>{item.categoryName}</div>
            
            {
                item.services.map((service)=>(
                <ListItemButton sx={{display: 'flex', justifyContent: 'space-between', }} onClick={()=> handleClick(service.options.length)} >
                    <div className='p-2'>
                        <div className='text-lg font-bold'>{service.serviceName}</div>
                        <div className='text-sm font-normal'>{service.serviceDuration}</div>
                        <div className='text-sm font-normal'>{service.serviceDescription}</div>
                        <div className='text-base font-medium'>{'$'+service.startingPrice}</div>
                    </div>
                    <div><OptionsModal props={service}/></div>
                    {/* {isOptions && <OptionsModal isOpen={isOptions}/>} */}
                </ListItemButton>
                ))
                
            }
            
            
        </div>
        
        
        
      ))}
        
  


    </List>
    </div>
    </LayoutContext.Provider>
    
  )
}

export default ServiceListItems