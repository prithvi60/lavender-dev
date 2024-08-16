import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";
import Text from "../../components/Text";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import GetIcon from "../../assets/Icon/icon";
import { useNavigate } from "react-router-dom";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import TextRouter from "../../components/TextRouter";
import { GiPathDistance } from "react-icons/gi";
import { FaStore } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function MyFavorites() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  // const [establishmentSearchResult, setEstablishmentSearchResult] = useState<any>([]);

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
    pageSize: 1000,
    sortBy: "",
    sortDirection: "",
    serviceTypes: [],
    minSalePrice: 0,
    maxSalePrice: 100000,
    searchCoordinates: [],
    mapStartCoordinates: [],
    mapEndCoordinates: [],
    availableStartTime: null,
    availableEndTime: null,
  };
  // results are not coming from the api endpoint in this query like Search page
  const { isLoading, data: establishmentSearchResult } = useQuery({
    queryKey: ["custom-data"],
    queryFn: () => endpoint.getEstablishmentSearchResults(payLoad),
  });

  // useEffect(()=>{
  //   setEstablishmentSearchResult(establishmentData)
  // },[establishmentData])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;

    if (
      coords1?.latitude == null ||
      coords2?.latitude == null ||
      coords1?.longitude == null ||
      coords2?.longitude == null
    ) {
      return null;
    }

    const dLat = toRad(coords2?.latitude - coords1?.latitude);
    const dLon = toRad(coords2?.longitude - coords1?.longitude);
    const lat1 = toRad(coords1?.latitude);
    const lat2 = toRad(coords2?.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const currentTime = new Date();

  const isWithinTimeRange = (openTime, closeTime) => {
    const currentDateString = currentTime.toISOString().split("T")[0];

    const open = new Date(`${currentDateString}T${openTime}:00`);
    const close = new Date(`${currentDateString}T${closeTime}:00`);
    const timeZoneOffset = currentTime.getTimezoneOffset() * 60000;
    const adjustedOpen = new Date(open.getTime() - timeZoneOffset);
    const adjustedClose = new Date(close.getTime() - timeZoneOffset);
    return currentTime >= adjustedOpen && currentTime <= adjustedClose;
  };
  // console.log("updatedTreatmentServicesList", establishmentSearchResult);

  return (
    <div className="bg-[#F2F2F2] ">
      <Box className="flex gap-2 px-16 py-12 pb-2">
        <IconButton onClick={() => navigate(-1)}>
          <GetIcon iconName="BackIconArrow" />
        </IconButton>
        <Text
          className="font-bold"
          name={"My Favourites"}
          align="left"
          sx={{ fontSize: "36px", fontWeight: 600, color: "#000000" }}
        ></Text>
      </Box>
      <div className="">
        {establishmentSearchResult?.data?.data?.length > 0 ? (
          <Grid container style={{ width: "100vw" }}>
            {establishmentSearchResult?.data?.data?.map((card) => {
              const distance = userLocation
                ? haversineDistance(
                    {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    },
                    { latitude: card.geoX, longitude: card.geoY }
                  )?.toFixed(2)
                : null;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={card?.establishmentId}
                  sx={{
                    "@media (min-width: 600px)": {
                      paddingLeft: "60px !important",
                      paddingBottom: "20px !important",
                      padding: "60px",
                    },
                    display: "flex",
                    justifyContent: "center",
                    "@media (max-width: 600px)": {
                      padding: "20px",
                    },
                  }}
                >
                  <div
                    // sx={{ width: "100%", height: "100%", borderRadius: "20px" }}
                    className="flex flex-col items-center justify-between w-full h-auto gap-5 min-[600px]:p-4 bg-white rounded-xl"
                  >
                    {/* <CardContent> */}
                    {/* <div className="card-wrap-container"> */}
                    <div className="flex flex-col w-full">
                      <div
                        className="flex flex-col gap-3"
                        // style={{ padding: "10px" }}
                      >
                        {card?.estImage ? (
                          <img
                            src={`data:image/png;base64, ${card?.estImage}`}
                            alt="saloon"
                            className="w-full rounded-t-lg min-[600px]:rounded-lg h-44"
                          />
                        ) : (
                          <img
                            src="/saloon-image.png"
                            alt="saloon"
                            className="w-full rounded-t-lg min-[600px]:rounded-lg h-44"
                          />
                        )}
                        <div
                          className="card-header-details max-[600px]:px-4  max-[600px]:py-2"
                          // style={{ marginLeft: "20px" }}
                        >
                          <div className="font-bold text-xl py-2 text-[#4D4D4D]">
                            {card?.establishmentName}
                          </div>
                          <div className="card-rating">
                            <div className="text-lg">
                              {card?.rating?.ratingStar}
                            </div>
                            <StyledRating
                              name="customized-color"
                              value={card?.rating?.ratingStar}
                              precision={0.5}
                              readOnly
                            />
                            <div className="text-sm font-bold">
                              {"(" + card?.rating?.ratingCount + ")"}
                            </div>
                          </div>
                          <div className="mb-3 text-sm font-semibold">
                            {card.geoX && card.geoY ? (
                              <div className="flex items-center">
                                <FaStore
                                  size={17}
                                  color="#484848"
                                  className="mr-1"
                                />
                                <span>{`Address : ${card.location}`}</span>
                              </div>
                            ) : null}
                          </div>
                          {/* {distance ? (
                                <div className="flex items-center mb-3 text-sm font-semibold text-slate-600">
                                  <GiPathDistance
                                    className="mr-2"
                                    size={25}
                                    color="red"
                                  />
                                  <span>
                                    Distance from your current location :{" "}
                                    {distance} km
                                  </span>
                                </div>
                              ) : null} */}
                          {!isWithinTimeRange(
                            card?.openTime,
                            card?.closeTime
                          ) ? (
                            <div className="text-sm font-medium text-blue-700">
                              <span className="font-semibold text-red-600">
                                Closed -
                              </span>{" "}
                              Opens at {card?.openTime}
                            </div>
                          ) : (
                            <div className="text-sm font-medium text-red-600 ">
                              <span className="font-semibold text-blue-700">
                                Opened -
                              </span>{" "}
                              Closes at {card?.closeTime}
                            </div>
                          )}
                          <div className="mt-2 chip-wrap">
                            {card?.serviceTags?.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                className="mb-2 mr-2"
                              />
                            ))}
                          </div>
                          {/* <IconButton className="absolute top-2 right-2">
                                <FavoriteIcon color="error" />
                              </IconButton> */}
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                    {/* </CardContent> */}
                    <div className="max-[600px]:flex justify-center items-center gap-0.5 max-[600px]:py-2 hidden ">
                      <StoreMallDirectoryOutlinedIcon />
                      <TextRouter
                        name={"Saloon Details"}
                        to={`/salon/${card?.establishmentId}`}
                      />
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div className="flex flex-col items-center justify-center h-[86vh] xl:h-[87vh] w-full gap-2 p-[60px]">
            <img
              // src="../../../public/favorite.png"
              src={require("../../assets/BackgroundImage/favorite.png")}
              alt="favorite"
              className="object-contain object-center w-80"
            />
            <h2 className="text-3xl font-semibold text-[#4D4D4D] text-center">
              You don't have any favourites
            </h2>
            <p className="text-lg text-[#333333] max-w-xs text-center">
              How about checkout through our wide range of services ?
            </p>
            <button
              type="button"
              className={` rounded-md px-4 py-2 bg-[#825FFF] text-white cursor-pointer capitalize`}
            >
              browser templates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
