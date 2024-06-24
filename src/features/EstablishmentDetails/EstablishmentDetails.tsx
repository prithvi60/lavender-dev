import HeaderDetails from "./HeaderDetails.js";
import ServiceDetails from "./ServiceDetails.tsx";
import Availability from "./Availability.js";
import About from "./About.js";
import endpoint from "../../api/endpoints.ts";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

import { Keyboard, Pagination, Navigation } from "swiper/modules";
import GetImage from "../../assets/GetImage.tsx";
import { Reviews } from "./Reviews.tsx";
function EstablishmentDetails({ estId }) {
  const {
    data: establishmentData,
    isLoading: isLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["query-establishment-details"],
    queryFn: () => {
      return endpoint.getEstablishmentDetailsById(estId);
    },
  });
  return (
    <div className="searchDetailsContainer">
      <HeaderDetails
        isLoading={isLoading}
        establishmentData={establishmentData?.data?.data?.profile}
      />
      {/* <ImageSlides /> */}
      <Swiper
        // className="w-4"
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
      >
        {/* TODO: API integration */}
        {Array.from({ length: 12 }).map(() => {
          return (
            <SwiperSlide>
              <GetImage imageName="SaloonImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mx-16 service-search-container">
        <ServiceDetails
          isLoading={isLoading}
          establishmentData={establishmentData?.data?.data?.categories}
        />
        <Availability
          isLoading={isLoading}
          establishmentData={establishmentData?.data?.data?.availableDays}
          profile={establishmentData?.data?.data?.profile}
        />
      </div>

      <Reviews  />

      <About establishmentEmployees= {establishmentData?.data?.data?.employees} establishmentAbout= {establishmentData?.data?.data?.profile?.establishmentAbout} establishmentFeatures={establishmentData?.data?.data?.features} establishmentLanguages={establishmentData?.data?.data?.languages} establishmentPaymentTypes={establishmentData?.data?.data?.paymentTypes} id="SearchDetailAbout" />
    </div>
  );
}

export default EstablishmentDetails;
