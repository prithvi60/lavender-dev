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
import { Reviews } from "./Reviews.tsx";
import { useEffect, useState } from "react";
import { Modal, useMediaQuery } from "@mui/material";
import { updateUser } from "../../store/slices/currentUserSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import GetIcon from "../../assets/Icon/icon.tsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px",
  boxShadow: 24,
  p: 4,
  borderradius: "2px",
};


function EstablishmentDetails({ estId }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [open, setOpen] = useState(false);

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const customerPaymentSuccess =
    location.pathname === "/salon/appointment-success";

  const dispatch = useDispatch();

  const goToHomePage = () => {
    navigate("/");
  };

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
      const response = await endpoint.getImages(
        image,
        establishmentData?.data?.data?.id
      );

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList]);

  useEffect(() => {
    setImageIdList(establishmentData?.data?.data?.estImages);
  }, [establishmentData]);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("Token")) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails(); // Call the async function to get user details
            const userDetails = response?.data; // Assuming response.data contains the user details

            dispatch(updateUser(userDetails?.data)); // Dispatch the updateUser action with user details
          } catch (error) {
            console.error("Error fetching user details:", error); // Handle any errors that occur
          }
        };
        fetchCurrentUserDetails();
      }
    }, 1000);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  useEffect(() => {
    if (customerPaymentSuccess) {
      setOpen(true);
    }
  }, [customerPaymentSuccess]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-3xl filter-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GetIcon
              onClick={() => {}}
              className="my-5 mx-16 p-1 cursor-pointer rounded-sm"
              iconName="CalendarConfirmedIcon"
            />
            <div id="title" className="font-bold text-2xl mb-3 text-indigo-800">
              Dear {userDetails?.fullName}
            </div>
            <div className="font-semibold text-base mb-3 text-gray-800">
              Your appointment has been confirmed
            </div>
          </div>
          <Grid container spacing={2} className="filters-container">
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Modal>
      <div className="searchDetailsContainer">
        <Grid container>
          <Grid item xs={12} order={{ xs: 1, md: 2 }}>
            <Swiper
              spaceBetween={20}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Navigation]}
              breakpoints={{
                600: { slidesPerView: 1 },
                601: { slidesPerView: 3 },
              }}
            >
              {/* <GetImage imageName="SaloonImage" /> */}
              {loading && <p>Loading...</p>}
              <Box sx={{}}>
                {imageUrls?.map((url, index) => (
                  <SwiperSlide>
                    <img
                      key={index}
                      src={url}
                      alt={`Images ${index}`}
                      style={{
                        width: "600px",
                        height: "340px",
                        borderRadius: isMobile ? '0' : '20px',
                      }}
                   
                    />
                  </SwiperSlide>
                ))}
              </Box>
            </Swiper>
          </Grid>
          <Grid item xs={12} order={{ xs: 2, md: 1 }}>
            <HeaderDetails
              isLoading={isLoading}
              establishmentData={establishmentData?.data?.data}
            />
          </Grid>
        </Grid>
        {/* <ImageSlides /> */}

        <Box
          className="mx-16 service-search-container"
          sx={{ "@media (max-width: 640px)": { mx: 4 } }}
        >
          <ServiceDetails
            isLoading={isLoading}
            establishmentData={establishmentData?.data?.data?.categories}
          />
          <Availability
            isLoading={isLoading}
            establishmentData={establishmentData?.data?.data?.availableDays}
            profile={establishmentData?.data?.data?.profile}
          />
        </Box>

        {establishmentData?.data?.data?.id && (
          <Reviews establishmentId={establishmentData?.data?.data?.id} />
        )}

        <About
          establishmentId={establishmentData?.data?.data?.id}
          establishmentEmployees={establishmentData?.data?.data?.employees}
          establishmentAbout={
            establishmentData?.data?.data?.profile?.establishmentAbout
          }
          establishmentFeatures={establishmentData?.data?.data?.features}
          establishmentLanguages={establishmentData?.data?.data?.languages}
          establishmentPaymentTypes={
            establishmentData?.data?.data?.paymentTypes
          }
          id="SearchDetailAbout"
        />
      </div>
    </>
  );
}

export default EstablishmentDetails;
