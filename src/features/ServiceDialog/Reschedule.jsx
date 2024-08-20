import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import endpoint from '../../api/endpoints';
import CheckoutFooterCard from './CheckoutFooterCard';
import CheckoutCard from './CheckoutCard';
import RescheduleAppointment from './RescheduleAppointment';

const Reschedule = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [establishmentData, setEstablishmentData] = useState([]);

    const { estId } = useParams();
    // console.log(estId);


    useEffect(() => {
        const getEstablishmentDetails = async () => {
            const establishmentData = await endpoint.getEstablishmentDetailsById(
                estId
            );
            if (establishmentData?.data?.success) {
                setEstablishmentData(establishmentData?.data?.data)
            }
        };
        getEstablishmentDetails();
    }, [])

    // console.log(establishmentData);
    

    return (
        <div style={{marginTop : "6rem"}} className='flex flex-col md:flex-row justify-between gap-10'>
            <RescheduleAppointment estData={establishmentData} />
            {!isMobile ? (
                <Box
                    sx={{
                        "@media (max-width: 1023px)": {
                            width: "100%",
                        },
                        "@media (min-width: 1024px)": {
                            width: "35%",
                        },
                    }}
                >
                    <CheckoutCard
                       establishmentName={
                        establishmentData?.profile?.establishmentName
                      }
                      establishmentId={establishmentData?.id}
                      time={"reschedule"}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        "@media (max-width: 1023px)": {
                            width: "100%",
                        },
                        "@media (min-width: 1024px)": {
                            width: "35%",
                        },
                    }}
                >
                    <CheckoutFooterCard
                        establishmentName={
                            establishmentData?.profile?.establishmentName
                          }
                          establishmentId={establishmentData?.id}
                        time={"reschedule"}
                    />
                </Box>
            )}
        </div>
    )
}

export default Reschedule
