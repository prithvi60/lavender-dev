import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabList} from '@mui/lab'
import React from 'react'
import { SampleData } from './SampleData'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Button from '../../components/Button';
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
    {/* <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {SampleData[0].services.map((item)=>(
        <ListItem >
            <ListItemText primary={item.serviceName} secondary={item.serviceDuration}></ListItemText>
        </ListItem>
      ))}

        
      </List> */}
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