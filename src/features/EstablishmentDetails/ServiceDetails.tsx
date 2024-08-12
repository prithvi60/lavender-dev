import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '../../components/Button';
import { SampleData } from './SampleData'
import { service } from '../../api/constants';
import Text from '../../components/Text';
import { borderRadius } from '@mui/system';

function ServiceDetails(props) {
  const {isLoading, establishmentData} = props
    const [value, setValue] = React.useState(0);
    const [tabValue, setTabValue] = React.useState('');
    const [viewAll, setViewAll] = React.useState(false);
    let visibleService = 0;

  useEffect(()=>{
    if(establishmentData){
      setTabValue(establishmentData[0]?.serviceTag|| '')

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

  function openServiceTab() {
    document.getElementById("ServicesHeaderButton").click()
  }

  return (
    <>
    {
      !isLoading && 
      <div className=''>
        <Text sx={styles.heading} name={"Services"} align="left"/>
        {/* <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
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
                establishmentData?.map((service)=> (
                  service?.services[0]?.serviceTags?.map((tag)=>(
                    <Tab label={tag} onClick={()=>handleTabChange(tag)}/>
                  ))
                ))
            }
          </Tabs>
        </Box> */}
      <List sx={{ width: '100%', maxWidth: 760, bgcolor: 'background.paper' }}>
        {/* {establishmentData?.data?.serviceCategories?.filter(x => x?.services[0]?.serviceTags?.includes(tabValue))?.map((service)=>( */}
        {establishmentData?.map((service)=>(
          service?.services?.map((item)=>{
              if (viewAll || visibleService < 6) {
                visibleService++;
                return (<ListItemButton className='serviceList' onClick={handleClick} >
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div className='p-2'>
                      <Text sx={styles.serviceName} name={item?.serviceName} align="left"/>
                      <Text sx={styles.duration} name={`${item?.options[0]?.duration} mins`} align="left"/>
                      <Text sx={styles.startingPrice} name={`$${item?.startingPrice}`} align="left"/>
                      {/* <div className='text-base font-medium'>{'$'+item.startingPrice}</div> */}
                    </div>
                    <div onClick={openServiceTab} className='badge-primary' style={{alignSelf: 'center'}}>Book</div>
                  </div>
                </ListItemButton>)
              }
        })
        ))}
      </List>
        <Button sx={styles.btn} variant="outlined" name={viewAll ? "Hide some" : 'View all'} onClick={() => setViewAll(!viewAll)}></Button>
        <div className='mb-2'></div>
    </div>
    }
    </>
    
  )
}

export default ServiceDetails

const styles={
  heading: {
    color: '#333333',
    fontSize: '36px',
    fontWeight: 600,
    paddingBottom: 2
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
  btn: {
    padding: "10px 40px 10px 40px",
    borderRadius: '10px',
  }
}