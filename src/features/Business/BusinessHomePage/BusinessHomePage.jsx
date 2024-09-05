
import BusinessHeroSection from './BusinessHeroSection'
import BusinessLearnMore from './BusinessLearnMore'
import { Container } from '@mui/material'
import BusinessBenefits from './BusinessBenefits'
import LandingFooter from '../../../pages/landingFooter'
import BusinessNavbar from './BusinessNavbar'

const BusinessHomePage = () => {
  return (
    <div>
      <BusinessNavbar />
      <BusinessHeroSection />
      <Container maxWidth="xl">
        <BusinessLearnMore mainTitle={"Best Salon software for your Salon/Spa"} summary={"We prioritize your convenience and aim to create a seamless and relaxing experience from booking to service delivery."} btn={"false"} />
        <BusinessBenefits />
        <BusinessLearnMore mainTitle={""} summary={"We prioritize your convenience and aim to create a seamless and relaxing experience from booking to service delivery."} btn={"true"} />
      </Container>
      <LandingFooter />
    </div>
  )
}

export default BusinessHomePage
