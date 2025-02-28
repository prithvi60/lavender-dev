import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Grid,
  Card,
  CardContent,
  Rating,
  styled,
  Box,
  Skeleton,
} from "@mui/material";
import {
  KeyboardArrowRightOutlined,
  KeyboardArrowLeftOutlined,
} from "@mui/icons-material";
import Text from "../../components/Text";
import Chip from "../../components/Chip";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import emptyLogo from "../../assets/emptyImage.png";
import establishmentImg from "../../assets/establishmentImg.png";

const RecommendSection = () => {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const payLoad = {
    pageNumber: 0,
    pageSize: 50,
    sortBy: "",
    sortDirection: "",
    serviceTypes: ["Hair", "Nail"],
    searchCoordinates: ["string"],
    mapStartCoordinates: ["string"],
    mapEndCoordinates: ["string"],
    availableStartTime: "2024-07-05T13:24:29.634Z",
    availableEndTime: "2024-07-05T13:24:29.634Z",
  };

  const { isLoading, data: establishmentSearchResult } = useQuery({
    queryKey: ["custom-data"],
    queryFn: () => endpoint.getEstablishmentSearch(payLoad),
  });

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <KeyboardArrowRightOutlined
        className={`${className} arrow next-arrow`}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <KeyboardArrowLeftOutlined
        className={`${className} arrow prev-arrow`}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "carousel-slider",
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "90px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  const [imageIdList, setImageIdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [estIdList, setEstIdList] = useState([]);

  useEffect(() => {
    const imageIds = establishmentSearchResult?.data?.data?.content?.map(
      (establishment) =>
        establishment.estImages.length > 0 ? establishment.estImages[0] : ""
    );

    const estIds = establishmentSearchResult?.data?.data?.content?.map(
      (item) => item?.establishmentId
    );
    setImageIdList(imageIds);
    setEstIdList(estIds);
  }, [establishmentSearchResult]);

  const fetchImage = async (image, estId) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(image, estId);
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (let i = 0; i < imageIdList.length; i++) {
        const imageId = imageIdList[i];
        const id = estIdList[i];
        const imageUrl = await fetchImage(imageId, id);
        const imageObject = { [imageId]: imageUrl };
        urls.push(imageObject);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList]);

  function getImages(imgId) {
    for (let i = 0; i < imageUrls?.length; i++) {
      if (imgId in imageUrls[i]) {
        return imageUrls[i][imgId];
      }
    }
    if (!imgId) return "/6d7555506d13d8f197f157219f9cf957.png";
    return null;
  }

  return (
    <Box className="recommend-section">
      <Grid item xs={12} className="pt-16 pb-8 md:pb-16">
        <Text sx={styles.header} name={"Our Recommended Picks"} />
      </Grid>
      {!isLoading && (
        <Slider {...settings} className="home-slider">
          {establishmentSearchResult?.data?.data?.content?.map((card) => (
            <div key={card?.id}>
              <div className="max-w-lg p-6 mx-2 shadow-lg md:mx-5 rounded-xl">
                {getImages(card?.estImages[0]) ? (
                  <img
                    src={getImages(card?.estImages[0])}
                    alt="CardImage"
                    className="card-image"
                  />
                ) : (
                  // <img src='/fb6f3c230cb846e25247.gif' alt='' className='card-image-loader' />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={150}
                    sx={{ borderRadius: "20px" }}
                  />
                  // <h6 className="card-image">Image not uploaded</h6>
                )}
                <CardContent className="card-content">
                  <Text
                    variant="h5"
                    align="left"
                    className="card-title"
                    sx={{
                      color: "#4D4D4D",
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    name={card?.establishmentName}
                  />
                  <div className="card-rating">
                    <Text
                      sx={{ color: "#4D4D4D" }}
                      variant="body2"
                      align="left"
                      name={card?.rating?.ratingStar}
                    />
                    <StyledRating
                      name="customized-color"
                      value={card?.rating?.ratingStar}
                      precision={0.5}
                      readOnly
                    />
                    <Text
                      sx={{ color: "#4D4D4D" }}
                      variant="body2"
                      align="left"
                      name={card?.rating?.ratingCount}
                    />
                  </div>
                  <Text
                    sx={{ color: "#808080" }}
                    variant="body2"
                    align="left"
                    className="card-location"
                    name={card?.establishmentLocation}
                  />
                  <div
                    className="gap-1 card-tags"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {card?.serviceTags?.length > 0 ? (
                      card?.serviceTags?.map((tag, index) => (
                        <Chip key={index} label={tag} className="small" />
                      ))
                    ) : (
                      <h6>No service tags</h6>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </Box>
  );
};

const styles = {
  header: {
    fontSize: "36px",
    fontWeight: 600,
    color: "#333333",
    lineHeight: "43px",
    textAlign: "center", // Adjusted for center alignment
  },
};

export default RecommendSection;
