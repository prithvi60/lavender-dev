import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '../../components/Button';
import { SampleData } from './SampleData'

function ServiceDetails() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleClick(){

  }
  return (
    <div className='mx-16 my-10'>
        <div className='text-xl font-bold'>Services</div>
        <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
      >
        {
            SampleData[0].serviceTags.map((tag)=> (
                <Tab label={tag} />
            ))
        }
      </Tabs>

      
    </Box>
      <List sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}>
      {SampleData[0].services.map((item)=>(
        <ListItemButton sx={{display: 'flex', justifyContent: 'space-between', }} onClick={handleClick} >
            
            <div className='p-2'>
                <div className='text-lg font-bold'>{item.serviceName}</div>
                <div className='text-sm font-normal'>{item.serviceDuration}</div>
                <div className='text-base font-medium'>{'$'+item.startingPrice}</div>
            </div>
            <div>Book</div>
        </ListItemButton>
        
        
      ))}
        
  


    </List>
    <Button variant="outlined" name={'View all'}></Button>
    <div className='mb-2'></div>
    <hr/>
    </div>
  )
}

export default ServiceDetails