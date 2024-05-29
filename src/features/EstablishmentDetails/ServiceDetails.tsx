import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '../../components/Button';
import { SampleData } from './SampleData'

function ServiceDetails(props) {
  const {isLoading, establishmentData} = props
    const [value, setValue] = React.useState(0);
    const [tabValue, setTabValue] = React.useState('');
  useEffect(()=>{
    if(establishmentData){
      setTabValue(establishmentData?.data?.serviceCategories[0]?.services[0]?.serviceTags[0] || '')

    }
  },[establishmentData, isLoading])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function handleClick(){

  }

  function handleTabChange(tag){
    
    setTabValue(tag)
  }

  return (
    <>
    {
      !isLoading && 
      <div className=''>
        <div className='text-xl font-bold'>Services</div>
        <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
      <Tabs
          className='serviceTabs'
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
            establishmentData?.data?.serviceCategories?.map((service)=> (
              service?.services[0]?.serviceTags?.map((tag)=>(
                <Tab label={tag} onClick={()=>handleTabChange(tag)}/>
              ))
            ))
        }
      </Tabs>

      
    </Box>
      <List sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}>
      {establishmentData?.data?.serviceCategories?.filter(x => x?.services[0]?.serviceTags?.includes(tabValue))?.map((service)=>(
        service?.services?.map((item)=>(
            <ListItemButton className='serviceList' onClick={handleClick} >
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <div className='p-2'>
                  <div className='text-lg font-bold'>{item.serviceName}</div>
                  <div className='text-sm font-normal text-gray-500'>{item.startingPrice}</div>
                  {/* <div className='text-base font-medium'>{'$'+item.startingPrice}</div> */}
                </div>
                <div className='badge-primary'>Book</div>
              </div>
          </ListItemButton>
        ))
      ))}
    </List>
        <Button variant="outlined" name={'View all'}></Button>
    <div className='mb-2'></div>
    </div>
    }
    </>
    
  )
}

export default ServiceDetails