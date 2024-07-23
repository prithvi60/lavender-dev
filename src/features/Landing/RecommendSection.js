import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Grid, Card, CardContent, Rating, styled, Box } from "@mui/material";
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

  const cards = [
    {
      id: 1,
      image: emptyLogo,
      rating: 4.2,
      reviewCount: 20,
      location: "Location 1",
      tags: ["Hair cut", "Hair styling", "Massage"],
    },
    {
      id: 2,
      image: emptyLogo,
      rating: 3.7,
      reviewCount: 30,
      location: "Location 2",
      tags: ["Tag 3", "Tag 4"],
    },
    {
      id: 3,
      image: emptyLogo,
      rating: 5.0,
      reviewCount: 40,
      location: "Location 3",
      tags: ["Tag 5", "Tag 6"],
    },
    {
      id: 4,
      image: emptyLogo,
      rating: 4.1,
      reviewCount: 50,
      location: "Location 4",
      tags: ["Tag 7", "Tag 8"],
    },
    {
      id: 5,
      image: emptyLogo,
      rating: 3.9,
      reviewCount: 10,
      location: "Location 5",
      tags: ["Tag 9", "Tag 10"],
    },
  ];

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
              <div className="mx-2 md:mx-5 max-w-lg p-6 shadow-lg rounded-xl">
                {getImages(card?.estImages[0]) ? (
                  <img
                    src={getImages(card?.estImages[0])}
                    alt="CardImage"
                    className="card-image"
                  />
                ) : (
                  <h6 className="card-image">Image not uploaded</h6>
                )}
                <CardContent className="card-content">
                  <Text
                    variant="h5"
                    align="left"
                    className="card-title"
                    sx={{ color: "#4D4D4D" }}
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
                    className="card-tags gap-1"
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
