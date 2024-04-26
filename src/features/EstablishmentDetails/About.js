import React from 'react'
import { SampleData } from './SampleData'
import Box from '@mui/material/Box';
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

function About(props) {
const {establishmentData} = props

  const additionalInfos = ["Payment methods", "Languages", "Accessibility"]
  return (
    <div className='mx-16 my-10'>
        <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
          <div className='text-xl font-bold pb-2'>About</div>
          <div className='text-lg font-normal'>{establishmentData?.data?.establishmentAbout}</div>

          <Card className='flex mt-4'>
                
                <CardContent sx={{width : 500}}>
                  <div className='text-lg font-bold'>Additional information</div>
                  <div className='flex justify-between py-2'>
                      <div className='text-lg font-semibold'>Payment methods</div>
                      <div>{
                        SampleData[0].paymentMethod.map((item)=>(
                          <div className='font-normal text-sm py-1'>{item}</div>
                        ))
                      }</div>
                  </div>
                  <hr/>

                  <div className='flex justify-between py-2'>
                      <div className='text-lg font-semibold'>Languages</div>
                      <div>{
                        SampleData[0].languages.map((item)=>(
                          <div className='font-normal text-sm py-1'>{item}</div>
                        ))
                      }</div>
                  </div>
                  <hr/>

                  <div className='flex justify-between py-2'>
                      <div className='text-lg font-semibold'>Accessibility</div>
                      <div>{
                        establishmentData?.data?.otherInfos?.map((item)=>(
                          <div className='font-normal text-sm py-1'>{item}</div>
                        ))
                      }</div>
                  </div>
                </CardContent>

                <CardContent className='bg-gray-200 w-72'>
                  <div className='text-lg font-bold text-center pb-4'>Our team</div>
                  {
                    SampleData[0].establishmentTeam.map((item)=>(
                      <div className='flex justify-evenly p-2'>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                        <div>{item.employeeTitle}</div>
                      </div>
                    ))
                  }
                </CardContent>
          </Card>

        </Box>

    </div>
  )
}

export default About