import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import GetIcon from '../../assets/Icon/icon'
import GetImage from '../../assets/GetImage'
import { AddNewCard } from './AddNewCard'


const SampleData = [{"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'},
  {"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'}, 
  {"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'}]

export const PaymentCard = () => {
  return (
    <div className='mt-10'>
        <div className='text-3xl font-bold py-4'>Payment Methods</div>
        <Card sx={{boxShadow: '0 1px 6px rgba(0,0,0,0.15)', borderRadius: '20px'}}>
            {/* <CardHeader title={'Saved Cards'}></CardHeader> */}
              <Grid container spacing={1}>
                <Grid item xs={9} sx={{padding: '30px !important'}}>
                  <div style={{fontSize: '24px', fontFamily: 'Urbanist', fontWeight: '700'}}>Saved Cards</div>
                  <Table>
                    <TableBody>
                      {
                        SampleData?.map((item)=>(
                          <TableRow>
                            <TableCell><GetIcon iconName='PaymentCardIcon'/></TableCell>
                            <TableCell>{item.cardHolderName}</TableCell>
                            <TableCell>{item.cardNumber}</TableCell>
                            <TableCell>{item.lastUsedDate}</TableCell>
                            <TableCell><GetIcon iconName='DeleteIcon'/></TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>

                  </Table>
                </Grid>
                <Grid item xs={3} sx={{}}>
                    <AddNewCard />
                </Grid>
              </Grid>


            
        </Card>
    </div>
  )
}
