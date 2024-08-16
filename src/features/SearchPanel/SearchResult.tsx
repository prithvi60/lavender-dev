import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Chip from "../../components/Chip";
import {
  Grid,
  Card,
  CardContent,
  Rating,
  CardActions,
  CardHeader,
  styled,
  Typography,
  Box,
  Button,
  Switch,
} from "@mui/material";
import FilterModal from "../../components/FilterModal";
import { useSelector } from "react-redux";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import { getRoute } from "../../utils";
import TextRouter from "../../components/TextRouter";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints.ts";
import "./style.css";
import { useLocation } from "react-router-dom";
import { GiPathDistance } from "react-icons/gi";
import { FaStore } from "react-icons/fa";

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";

const markers = [
  {
    position: { lat: 22.5958, lng: 88.2636 },
    name: "Howrah",
    id: 1,
  },

  {
    position: { lat: 22.6437, lng: 88.3777 },
    name: "Baranagar",
    id: 2,
  },
  {
    position: { lat: 22.5754, lng: 88.4798 },
    name: "New Town",
    id: 3,
  },
];

interface SearchPageState {
  searchPage: {
    selectedBox: string; // Or appropriate types for each property
    showOptionContainer: boolean;
    treatmentList: string[];
    locationList: any;
    selectedDate: any;
    SelectedTime: any;
    date: any;
    choseFromOptions: boolean;
  };
}

interface Payload {
  serviceNames?: any;
  startDate?: any;
  endDate?: any;
  geoX?: number;
  geoY?: number;
  range?: number;
  startTime?: any;
  endTime?: any;
}

export default function SearchResult() {
  const mapRef = useRef(null);

  const {
    selectedBox,
    showOptionContainer,
    treatmentList,
    locationList,
    selectedDate,
    date,
    SelectedTime,
    choseFromOptions,
  } = useSelector((state: SearchPageState) => state.searchPage);

  const [map, setMap] = React.useState(null);
  const [zoom, setZoom] = useState<number>(1);

  const [activeMarker, setActiveMarker] = useState(null);
  const [activeCurrentLocation, setActiveCurrentLocation] = useState(false);
  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: locationList[0]?.center?.lat,
    longitude: locationList[0]?.center?.lng,
  });

  const { state } = useLocation();

  const [markers, setMarkers] = useState(state.treatmentServicesList);

  // const markers = [...state.treatmentServicesList];

  const transformData = (data) => ({
    position: { lat: data.geoX || null, lng: data.geoY || null },
    name: data.establishmentName,
    id: data.establishmentId,
    image: data.estImage,
    location: data.location,
  });

  const transformedData = markers
    .filter(
      (item) =>
        item.geoX !== undefined &&
        item.geoY !== undefined &&
        typeof item.geoX === "number" &&
        typeof item.geoY === "number"
    )
    .map(transformData);

  const payLoad = {
    // pageNumber: 0,
    // pageSize: 50,
    // sortBy: "",
    // sortDirection: "",
    // serviceTypes: treatmentList[0].treatmentList,
    // searchCoordinates: ["string"],
    // mapStartCoordinates: locationList[0].center.lat,
    // mapEndCoordinates: locationList[0].center.lng,
    // availableStartTime: SelectedTime.selectedTime.from,
    // availableEndTime: SelectedTime.selectedTime.to,

    pageNumber: 0,
    pageSize: 50,
    sortBy: "",
    sortDirection: "",
    serviceTypes: [],
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

  const establishmentList = useMemo(() => {
    return !isLoading ? establishmentSearchResult?.data?.data?.content : null;
  }, [isLoading, establishmentSearchResult]);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isShowMap, setIsShowMap] = useState(false);
  const FILTERR = useSelector((state: any) => state.filterModal);

  const sortBy = useCallback(
    (list: any[]) => {
      if (FILTERR.SortBy === "Price") {
        list.sort((a, b) => {
          const lowestPriceA = Math.min(
            ...a.services.map((service) => service?.price)
          );
          const lowestPriceB = Math.min(
            ...b.services.map((service) => service?.price)
          );
          return lowestPriceA - lowestPriceB;
        });
      }
      if (FILTERR.SortBy === "Ratings") {
        list.sort((a, b) => b.rating - a.rating);
      }
      return list;
    },
    [FILTERR]
  );

  const { isLoaded: apiIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });

          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
          );
          const geocodeData = await geocodeResponse.json();

          if (geocodeData.results && geocodeData.results.length > 0) {
            const location = geocodeData.results[0].formatted_address;
            setLocationName(location);
          }

          setIsLoaded(true);
        },
        (error) => {
          console.error("Error getting geolocation", error);
          setIsLoaded(true);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoaded(true);
    }
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    setActiveCurrentLocation(false);
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "95%",
    height: "400px",
    borderRadius: "10px",
  };

  const handleCurrentLocationClick = () => {
    setActiveMarker(null);
    setActiveCurrentLocation(true);
  };

  useEffect(() => {
    if (!isLoading) {
      let tempData = [...establishmentList];
      if (
        FILTERR.selectedTags &&
        FILTERR.selectedTags.length > 0 &&
        establishmentList &&
        establishmentList.length > 0
      ) {
        tempData = establishmentList?.filter((item: any) =>
          item.serviceTags.some((tag) =>
            FILTERR.selectedTags.some(
              (selectedTag) => tag.toLowerCase() === selectedTag.toLowerCase()
            )
          )
        );
      }
      if (FILTERR.price.min !== 0 || FILTERR.price.max !== 100) {
        tempData = tempData
          ?.map((item: any) => ({
            ...item,
            services: item.services.filter(
              (service: any) =>
                service?.startingPrice >= FILTERR.price.min &&
                service?.startingPrice <= FILTERR.price.max
            ),
          }))
          .filter((item: any) => item.services.length > 0);
      }
      tempData = sortBy(tempData);
      setFilteredData(tempData);
    }
  }, [FILTERR, establishmentList, isLoading, sortBy]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  function handleClick() {}

  function handleMapClick() {
    setIsShowMap((prev) => !prev);
  }

  const getSearchDetailsRoute = () => {
    return getRoute("SearchDetails");
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setUserLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });
  //   }
  // }, []);

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

  const processDataForCSV = (data) => {
    return data.map(({ estImage, ...rest }) => rest);
  };

  const getAddressDetails = async (card) => {
    const { geoX, geoY } = card;
    if (geoX !== null && geoY !== null) {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoX},${geoY}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].formatted_address;
        return location;
      }
    }
    return null;
  };

  const handleZoomChanged = async () => {
    if (map) {
      const baseRange = 1000;
      const Range = baseRange / Math.pow(2, map.getZoom() - 10);

      if (Range) {
        const payLoad: Payload = {
          // seviceNames: treatmentList,
          // // categoryName: ["Hair treatment"],
          // startDate: selectedDate.split("to")[0]?.trim(),
          // endDate: selectedDate.split("to")[1]?.trim(),
          // geoX: locationList[0]?.center?.lat,
          // geoY: locationList[0]?.center?.lng,
          // range: locationList[0]?.range,
          // startTime: SelectedTime?.from,
          // endTime: SelectedTime?.to,
        };

        if (treatmentList && treatmentList.length > 0) {
          payLoad.serviceNames = treatmentList;
        }

        if (date) {
          const [startDate, endDate] = date
            .split("to")
            .map((date) => date?.trim());
          if (startDate) {
            payLoad.startDate = startDate;
          }
          if (endDate) {
            payLoad.endDate = endDate;
          }
        }

        if (locationList && locationList[0]) {
          const { center, range } = locationList[0];
          if (center) {
            if (center.lat) {
              payLoad.geoX = center.lat;
            }
            if (center.lng) {
              payLoad.geoY = center.lng;
            }
          }
          if (Range) {
            payLoad.range = Range;
          }
        } else {
          payLoad.geoX = center?.lat;
          payLoad.geoY = center?.lng;
          payLoad.range = Range;
        }

        if (SelectedTime) {
          const { from, to } = SelectedTime;
          if (from) {
            payLoad.startTime = from;
          }
          if (to) {
            payLoad.endTime = to;
          }
        }

        try {
          const establishmentSearchResultResponse =
            await endpoint.getEstablishmentSearchResults(payLoad);
          const treatmentServicesList =
            establishmentSearchResultResponse.data.data;

          for (const card of treatmentServicesList) {
            const location = await getAddressDetails(card);
            card.location = location;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const handleDragEnd = (map: google.maps.Map) => {
    const newCenter = map.getCenter();
    if (newCenter) {
      setCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
    console.log("Map dragged to:", newCenter?.toJSON());
  };

  const calculateBounds = () => {
    if (!transformedData || transformedData.length === 0) {
      return null; // Handle empty data case
    }

    const bounds = new window.google.maps.LatLngBounds();
    transformedData.forEach(({ position }) => {
      bounds.extend(position);
    });
    return bounds;
  };

  useEffect(() => {
    if (map) {
      const bounds = calculateBounds();
      if (bounds) {
        map.fitBounds(bounds);
      } else {
        map.setCenter(center);
      }
    }
  }, [map, transformedData, center]);

  const customServices = [
    {
      serviceName: "Hair Spa",
      startingPrice: 100,
      availabilities: [
        {
          date: "2024-08-07",
          timeSlots: ["10:00 AM", "11:00 AM", "12:00 PM"],
        },
        {
          date: "2024-08-08",
          timeSlots: ["12:00 PM", "11:00 AM", "03:00 PM"],
        },
      ],
    },
    {
      serviceName: "Hair Dye",
      startingPrice: 150,
      availabilities: [
        {
          date: "2024-08-08",
          timeSlots: ["01:00 PM", "02:00 PM", "03:00 PM"],
        },
      ],
    },
    {
      serviceName: "Beauty Therapy",
      startingPrice: 200,
      availabilities: [
        {
          date: "2024-08-07",
          timeSlots: ["03:00 PM", "05:00 PM", "06:00 PM"],
        },
      ],
    },
  ];

  const updatedTreatmentServicesList = state?.treatmentServicesList?.map(
    (card) => ({
      ...card,
      services: card.services ? card.services : [],
      rating: {
        ratingStar: (Math.random() * 2 + 3).toFixed(1),
        ratingCount: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
      },
    })
  );

  return (
    <Card
      className="search-page-container"
      sx={{ width: "100%", height: "100%" }}
    >
      <CardHeader
        style={{
          marginTop: "70px",
          color: "#4D4D4D",
          backgroundColor: "#FFFBF3",
          padding: "12px 4%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4.4rem", 
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
          "@media (max-width: 700px)": {
            height: "4rem",
            padding: "12px 8%",
          },
        }}
        sx={{
          "@media (max-width: 700px)": {
            marginTop: "100px !important",
            alignItems: "flex-start",
            "& .MuiCardHeader-content": {
              marginBottom: "8px",
            },
          },
          "@media (max-width: 400px)": {
            marginTop: "150px !important",
          },
        }}
        title={
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.2rem",
              "@media (max-width: 700px)": {
                fontSize: "1rem",
              },
              "@media (max-width: 400px)": {
                fontSize: "0.9rem",
              },
            }}
          >
            {`${updatedTreatmentServicesList?.length} venues matching your search`}
          </Typography>
        }
        action={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "3%",
            }}
            className="flex justify-center"
          >
            <FilterModal />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "16px",
                "@media (max-width: 700px)": {
                  width: "100%",
                  justifyContent: "center",
                  marginLeft: 0,
                },
              }}
            >
  
            </Box>
            <Typography
              variant="body2"
              sx={{
                marginLeft: "16px",
                "@media (max-width: 700px)": {
                  display: "none",
                },
                fontSize: '20px',
                fontWeight: 400,
                color: '#4D4D4D'
              }}
            >
              Map mode
            </Typography>
            <Switch
            className='toggle-ui'
              checked={isShowMap}
              onChange={handleMapClick}
              color="success"
              sx={{
                marginLeft: "16px",
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4caf50",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4caf50",
                },
                "@media (max-width: 700px)": {
                  display: "none",
                }
              }}
            />
          </Box>
        }
      />
      <hr />
      <div className="search-result-container">
        <Grid container spacing={2} style={{ width: "100vw" }}>
          <Grid item xs={12} order={{ xs: 1, md: 2 }} md={isShowMap ? 6 : 12}>
            <div className="flex justify-center mb-4">
              {apiIsLoaded && isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    width: "95%",
                    height: "400px",
                    borderRadius: "10px",
                    pointerEvents: "auto",
                    touchAction: "pan-y",
                  }}
                  onLoad={(mapInstance) => setMap(mapInstance)}
                  center={center}
                  zoom={14}
                  onClick={() => setActiveMarker(null)}
                  options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                      {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }],
                      },
                      {
                        featureType: "road",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                      },
                      {
                        featureType: "transit",
                        stylers: [{ visibility: "off" }],
                      },
                    ],
                  }}
                  ref={mapRef}
                  onZoomChanged={handleZoomChanged}
                >
                  {transformedData.map(
                    ({ id, name, position, image, location }) => (
                      <MarkerF
                        key={id}
                        position={position}
                        onClick={() => handleActiveMarker(id)}
                        icon={{
                          url: "https://res.cloudinary.com/djoz0tmyl/image/upload/v1722526576/lavenderLogo_jrmyir.png",
                          scaledSize: new window.google.maps.Size(22, 22),
                          anchor: new window.google.maps.Point(14, 38),
                        }}
                      >
                        {activeMarker === id ? (
                          <InfoWindowF
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <div
                              style={{
                                width: "250px",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                              }}
                              className="flex flex-col  items-center"
                            >
                              <img
                                src={`data:image/png;base64, ${image}`}
                                alt={name}
                                style={{ width: "200px", height: "100px" }}
                                className="mb-1 rounded-md mt-2"
                              />
                              <h5 className=" text-gray-600 font-bold m-1 text-center">
                                {name}
                              </h5>
                              <p className="text-sm text-black font-medium m-1 text-center">
                                {location}
                              </p>
                            </div>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    )
                  )}

                  <MarkerF
                    position={center}
                    icon={{
                      url: "https://res.cloudinary.com/djoz0tmyl/image/upload/v1722526805/googleMaps_ydgvvh.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    onClick={handleCurrentLocationClick}
                  >
                    {activeCurrentLocation ? (
                      <InfoWindowF
                        onCloseClick={() => setActiveCurrentLocation(false)}
                      >
                        <div
                          style={{
                            width: "200px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            textAlign: "center",
                          }}
                        >
                          <p className="text-base text-gray-600 font-semibold">
                            {locationName}
                          </p>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                </GoogleMap>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} order={{ xs: 2, md: 1 }} md={isShowMap ? 6 : 0}>
            <Grid container spacing={2}>
              {updatedTreatmentServicesList &&
              updatedTreatmentServicesList?.length > 0 ? (
                updatedTreatmentServicesList?.map((card, index) => {
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
                    <Grid item xs={12} key={card?.establishmentId}>
                      <Card sx={{ width: "100%", height: "100%" }}>
                        <CardContent>
                          <div className="card-wrap-container">
                            <div className="card-container">
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
                                        <div>
                                          from ${service?.startingPrice}
                                        </div>
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
                                                        onClick={() =>
                                                          handleClick()
                                                        }
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
                          <CardActions className="card-footer-action ">
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
                })
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" gutterBottom>
                    No result found
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
