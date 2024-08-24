import GetImage from "../../../assets/GetImage";
import Text from "../../../components/Text";


function BusinessBenefits() {
    return (
        <div className='mt-4'>
            <div className='home-benifits-cards'>
                <div className='rounded-xl shadow-lg p-3 md:p-6 border'>
                    <GetImage className='flex justify-center items-center' imageName='FaceService' />
                    <div className='ml-2'>
                        <Text sx={styles.header} name={"Personalized Service Selection"} align={'left'} />
                        <Text sx={styles.subHeader} align={'left'} name={"Choose from our array of soothing services, each designed to rejuvenate your mind, body, and soul."} />
                    </div>
                </div>

                <div className='rounded-xl shadow-lg p-3 md:p-6 border'>
                    <GetImage className='flex justify-center items-center' imageName='BookingImage' />
                    <div className='ml-2'>
                        <Text sx={styles.header} name={"Effortless Booking"} align={'left'} />
                        <Text sx={styles.subHeader} align={'left'} name={"We offer a user-friendly online platform for effortless appointment scheduling."} />
                    </div>
                </div>

                <div className='rounded-xl shadow-lg p-3 md:p-6 border'>
                    <GetImage className='flex justify-center items-center' imageName='CancellationImage' />
                    <div className='ml-2'>
                        <Text sx={styles.header} name={"Cancellation"} align={'left'} />
                        <Text sx={styles.subHeader} align={'left'} name={"To cancel an appointment, please provide a minimum of 24 hours' notice."} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BusinessBenefits;

const styles = {
    header: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#4D4D4D',
        lineHeight: '33.6px',
        paddingBottom: '15px'
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: 400,
        color: '#000000',
        lineHeight: '24px',
    },
}