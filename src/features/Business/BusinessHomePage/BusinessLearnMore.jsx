import { Box, Container } from '@mui/material';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import ButtonRouter from '../../../components/ButtonRouter';

const BusinessLearnMore = ({ mainTitle, summary, btn }) => {
    return (
        <Container maxWidth="xl" className="learn-more text-center mt-12">
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <Text sx={styles.header} name={mainTitle} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <Text
                    name={
                        summary
                    }
                    sx={styles.subHeader}
                />
            </Box>

            {/* <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <Button sx={styles.buttonStyles} variant="contained" name={'Join For Free'} />
            </Box> */}
            {btn === "true" && (<ButtonRouter
                sx={{
                    width: "180px",
                    height: "45px",
                    fontFamily: "Urbanist",
                    borderRadius: "10px",
                    fontSize: "20px",
                    marginTop: "30px",
                    "@media (max-width: 600px)": {
                        fontSize: "16px",
                        width: "140px",
                    },
                }}
                name={"Join for free"}
                to="/business/login"
            />)}

        </Container>
    );
};

export default BusinessLearnMore;

const styles = {
    header: {
        fontSize: '36px',
        fontWeight: 700,
        color: '#4D4D4D',
        lineHeight: '54px',
        // maxWidth: '505px',
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: 400,
        color: '#000000',
        lineHeight: '24px',
        maxWidth: '607px',
    },
    buttonStyles: {
        width: '200px',
        height: '50px',
        fontFamily: 'Urbanist',
        borderRadius: '10px',
        padding: '10px 40px',
        marginTop: '20px',
    },
};
