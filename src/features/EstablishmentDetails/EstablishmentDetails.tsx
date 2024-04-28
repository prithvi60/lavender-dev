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
function EstablishmentDetails({ estId }) {
  const id = 789;
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
        establishmentData={establishmentData}
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
          establishmentData={establishmentData}
        />
        <Availability
          isLoading={isLoading}
          establishmentData={establishmentData}
        />
      </div>
      <About establishmentData={establishmentData} id="SearchDetailAbout" />
    </div>
  );
}

export default EstablishmentDetails;
