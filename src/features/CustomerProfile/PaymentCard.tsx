import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import GetIcon from '../../assets/Icon/icon'
import GetImage from '../../assets/GetImage'
import { AddNewCard } from './AddNewCard'
import { convertToDateMonth } from '../../utils/TimeFormat'
import Text from '../../components/Text'

const SampleData = [{"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'},
  {"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'}, 
  {"cardHolderName": 'Olivia', "cardNumber": "12******125", "lastUsedDate": '06/24'}]

export const PaymentCard = ({userInfo}) => {
  return (
    <div className='mt-10'>
        <Text sx={styles.heading} name={'Payment Methods'} align="left"></Text>
        <Card sx={{boxShadow: '0 1px 6px rgba(0,0,0,0.15)', borderRadius: '20px'}}>
            {/* <CardHeader title={'Saved Cards'}></CardHeader> */}
              <Grid container spacing={1}>
                <Grid item xs={9} sx={{padding: '30px !important'}}>
                  <Text sx={styles.subHeading} name={"Saved Cards"} align="left"/>
                  <Table>
                    <TableBody>
                      {
                        userInfo?.cardList?.map((item)=>(
                        <TableRow>
                          <TableCell><GetIcon iconName='PaymentCardIcon'/></TableCell>
                          <TableCell>{item?.cardName}</TableCell>
                          <TableCell>{item?.cardNum}</TableCell>
                          <TableCell>{convertToDateMonth(item?.createdDate)}</TableCell>
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
const styles = {
  heading: {
    color: '#4D4D4D',
    fontSize: '36px',
    fontWeight: 600,
    paddingBottom: 2
  },
  subHeading: {
    color: '#333333',
    fontSize: '28px',
    fontWeight: 700,
    padding: 2
  },
}