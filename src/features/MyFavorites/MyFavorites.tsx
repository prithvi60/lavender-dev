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
    queryFn: () => endpoint.getEstablishmentSearch(payLoad),
  });

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

  return (
    <div className="bg-[#F2F2F2] ">
      <Box className="py-12 px-16 flex gap-2 pb-2">
        <IconButton onClick={() => navigate(-1)}>
          <GetIcon iconName="BackIconArrow" />
        </IconButton>
        <Text
          className="font-bold"
          name={"My Favourites"}
          align="left"
          fontSize="24px"
        ></Text>
      </Box>
      <div className="">
        {establishmentSearchResult?.data?.data?.content?.length > 0 ? (
          <Grid container style={{ width: "100vw" }}>
            {establishmentSearchResult.data.data.content.map((card) => {
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
                  key={card.establishmentId}
                  sx={{
                    paddingLeft: "60px !important",
                    paddingBottom:"20px !important",
                    padding: "60px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{ width: "100%", height: "100%", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <div className="card-wrap-container">
                        <div className="card-container flex flex-col">
                          <div
                            className="card-header"
                            style={{ padding: "20px" }}
                          >
                            {card.estImage ? (
                              <img
                                src={`data:image/png;base64, ${card.estImage}`}
                                alt="saloon"
                                className="w-full rounded-lg"
                              />
                            ) : (
                              <img
                                src="/saloon-image.png"
                                alt="saloon"
                                className="w-full rounded-lg"
                              />
                            )}
                            <div
                              className="card-header-details"
                              style={{ marginLeft: "20px" }}
                            >
                              <div className="chip-wrap">
                                {card?.serviceTags?.map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag}
                                    className="mr-2 mb-2"
                                  />
                                ))}
                              </div>
                              <div className="font-bold text-xl py-2 text-violet-700 ">
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
                              <div className="text-sm mb-3 font-semibold">
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
                              {distance ? (
                                <div className="text-sm mb-3 text-slate-600 font-semibold flex items-center">
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
                              ) : null}
                              {!isWithinTimeRange(
                                card?.openTime,
                                card?.closeTime
                              ) ? (
                                <div className="text-sm text-blue-700 font-medium">
                                  <span className="text-red-600 font-semibold">
                                    Closed -
                                  </span>{" "}
                                  Opens at {card?.openTime}
                                </div>
                              ) : (
                                <div className=" text-sm text-red-600 font-medium">
                                  <span className="text-blue-700 font-semibold">
                                    Opened -
                                  </span>{" "}
                                  Closes at {card?.closeTime}
                                </div>
                              )}
                              <IconButton className="absolute top-2 right-2">
                                <FavoriteIcon color="error" />
                              </IconButton>
                            </div>
                          </div>
                          <Grid container style={{ padding: "20px" }}>
                            {card?.services?.map((service, index) => (
                              <Grid item xs={12} key={index}>
                                <div className="card-body-details">
                                  <div className="card-body-title">
                                    <div className="font-semibold">
                                      {service?.serviceName}
                                    </div>
                                    <div>from ${service?.startingPrice}</div>
                                  </div>
                                  <div
                                    className="card-slick-container"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <div
                                      style={{
                                        overflowX: "auto",
                                        display: "flex",
                                      }}
                                    >
                                      {service?.availabilities?.map(
                                        (availability, index) => (
                                          <div
                                            key={index}
                                            className="availability-container"
                                          >
                                            <div className="time-slots-container">
                                              {availability?.timeSlots?.map(
                                                (timeSlot, idx) => (
                                                  <Chip
                                                    key={idx}
                                                    label={timeSlot}
                                                    variant="outlined"
                                                    onClick={() => {}}
                                                    className="time-slot-chip"
                                                  />
                                                )
                                              )}
                                            </div>
                                            <Typography
                                              sx={{
                                                color: "#B3B3B3",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                paddingLeft: "5px",
                                              }}
                                            >
                                              {availability?.date}
                                            </Typography>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      </div>
                      <CardActions
                        className="card-footer-action "
                        style={{ borderRadius: "0px 0px 20px 20px" }}
                      >
                        <StoreMallDirectoryOutlinedIcon />
                        <TextRouter
                          name={"Saloon Details"}
                          to={`/salon/${card?.establishmentId}`}
                        />
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div className="flex flex-col gap-6 justify-center items-center">
            <h2 className="text-3xl font-semibold text-[#4D4D4D] text-center">
              You don't have any favourites
            </h2>
            <p className="text-lg text-[#333333] max-w-xs text-center">
              How about checkout through our wide range of services ?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
