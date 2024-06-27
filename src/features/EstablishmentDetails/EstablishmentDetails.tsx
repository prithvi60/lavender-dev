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
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
function EstablishmentDetails({ estId }) {
  const [imageIdList, setImageIdList]= useState<string | any>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

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

  
  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(image, establishmentData?.data?.data?.id);

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect( () =>{
    const callFetchImageApi = async () =>{
      debugger
      console.log("in  api")
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    }
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList])

  useEffect(()=>{
    console.log('in effect')
    setImageIdList(establishmentData?.data?.data?.estImages)
  }, [establishmentData])


  return (
    <div className="searchDetailsContainer">
      <HeaderDetails
        isLoading={isLoading}
        establishmentData={establishmentData?.data?.data}
      />
      {/* <ImageSlides /> */}
      <Swiper
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
        
              {/* <GetImage imageName="SaloonImage" /> */}
              {loading && <p>Loading...</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {imageUrls.map((url, index) => (
                  <SwiperSlide>
                    <img key={index} src={url} alt={`Image ${index}`} style={{ width: '300px', height: '200px', margin: '10px' }} />
                  </SwiperSlide>
                ))}
              </div>
            
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
