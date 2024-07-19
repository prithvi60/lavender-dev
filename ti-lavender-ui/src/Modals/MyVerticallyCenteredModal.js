import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdMyLocation } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { updateSearchLocationList } from "../store/slices/searchPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  GoogleMap,
  InfoWindowF,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import endpoint from "../api/endpoints";

const MyVerticallyCenteredModal = (props) => {
  const { locationList } = useSelector((state) => state.searchPage);

  const {
    setIsLocationOpen,
    setIsTreatmentOpen,
    setDatePickerOpen,
    setTimePickerOpen,
  } = props;

  const dispatch = useDispatch();

  const [inputLocation, setInputLocation] = useState("");

  const navigate = useNavigate();

  // const [center, setCenter] = useState(null);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const [map, setMap] = useState(null);

  const [activeMarker, setActiveMarker] = useState(null);
  const [activeCurrentLocation, setActiveCurrentLocation] = useState(false);
  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapHeight, setMapHeight] = useState("400px");
  const [treatmentServicesList, setTreatmentServicesList] = useState([]);

  // const markers = [...treatmentServicesList];

  const transformData = (data) => ({
    position: { lat: data.geoX || 0, lng: data.geoY || 0 },
    name: data.establishmentName,
    id: data.establishmentId,
  });

  // const transformedData = markers.map(transformData);

  const getCurrentLocation = (onHide) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const range = 5;
          setCenter({ lat: latitude, lng: longitude });

          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
          );
          const geocodeData = await geocodeResponse.json();

          if (geocodeData.results && geocodeData.results.length > 0) {
            const location = `${geocodeData.results[0].formatted_address.slice(
              0,
              40
            )}...`;

            dispatch(
              updateSearchLocationList([
                {
                  location: location,
                  center: { lat: latitude, lng: longitude },
                  range: range,
                },
              ])
            );
            setRecentSearches((prev) => [
              {
                location: location,
                region:
                  geocodeData.results[0].address_components.find((c) =>
                    c.types.includes("administrative_area_level_1")
                  )?.short_name || "Unknown Region",
              },
              ...prev,
            ]);
            onHide();
          }
        },

        (error) => {
          console.error("Error getting geolocation", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;
    script.defer = true;
    script.async = true;

    script.onload = initializeGoogleMaps;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [locationName]);

  const initializeGoogleMaps = () => {};

  const searchByLocation = async (e) => {
    const { value } = e.target;

    if (value.length >= 3 && window.google) {
      setInputLocation(value);
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestedLocations(predictions);
          }
        }
      );
    } else {
      setSuggestedLocations([]);
    }
  };

  const handleSuggestionClick = async (placeId) => {
    const placeService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placeService.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const location = `${place.formatted_address.slice(0, 40)}...`;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        dispatch(
          updateSearchLocationList([
            {
              location: location,
              center: { lat, lng },
              range: 5,
            },
          ])
        );

        setRecentSearches((prev) => [
          {
            location,
            region:
              place.address_components.find((c) =>
                c.types.includes("administrative_area_level_1")
              )?.short_name || "Unknown Region",
          },
          ...prev,
        ]);

        setSuggestedLocations([]);
        props.onHide();
      }
    });
  };

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

  useEffect(() => {
    function updateMapHeight() {
      if (window.innerWidth <= 768) {
        setMapHeight("250px");
      } else {
        setMapHeight("400px");
      }
    }

    updateMapHeight();

    window.addEventListener("resize", updateMapHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateMapHeight);
    };
  }, []);

  const containerStyle = {
    width: "100%",
    height: mapHeight,
    borderRadius: "10px",
  };

  const handleCurrentLocationClick = () => {
    setActiveMarker(null);
    setActiveCurrentLocation(true);
  };

  const closeAllFilters = () => [
    setIsTreatmentOpen(false),
    setIsLocationOpen(false),
    setDatePickerOpen(false),
    setTimePickerOpen(false),
  ];

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

  const getLocationList = async () => {
    if (locationList?.length > 0) {
      const payLoad = {
        geoX: locationList[0]?.center?.lat,
        geoY: locationList[0]?.center?.lng,
        range: locationList[0]?.range,
      };

      try {
        const treatementBasedGeoLocationResponse =
          await endpoint.getTreatmentServicesListByLocation(payLoad);

        const treatmentServicesList =
          treatementBasedGeoLocationResponse.data.data;
        for (const card of treatmentServicesList) {
          const location = await getAddressDetails(card);
          card.location = location;
        }

        setTreatmentServicesList(treatmentServicesList);
        navigate("/search", {
          state: {
            treatmentServicesList: treatmentServicesList,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getLocationList();
  }, [locationList]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ marginTop: "20px" }}
    >
      <Modal.Header
        closeButton
        onClick={closeAllFilters}
        style={{
          borderBottom: "none",
          fontSize: "22px",
          color: "gray",
          fontWeight: "600",
        }}
      ></Modal.Header>
      <Modal.Body>
        <div className="px-3">
          <input
            type="search"
            placeholder="Search for your location/society/locality"
            className="px-3 py-3 w-full  border rounded-md mb-3 "
            onChange={searchByLocation}
          />
        </div>
        <div
          className="flex items-center cursor-pointer px-3"
          style={{ color: "blueviolet" }}
          onClick={() => getCurrentLocation(props.onHide)}
        >
          <MdMyLocation size={18} className="mr-2" />
          <span className="text-base font-semibold">Use current location</span>
        </div>

        <div className="mt-6 shadow-lg px-3 ">
          {suggestedLocations && suggestedLocations.length > 0 ? (
            <>
              {suggestedLocations.map((item, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleSuggestionClick(item.place_id)}
                >
                  <p>{item.description}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              <h4> Recents</h4>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                {recentSearches.length > 0 ? (
                  recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="text-gray-600 flex items-center mt-3"
                    >
                      <CiTimer size={23} />
                      <div className="ml-6">
                        <h5 className="text-base font-bold">
                          {search.location}
                        </h5>
                        <h5 className="text-sm font-medium">{search.region}</h5>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No recent searches</p>
                )}
              </div>
            </>
          )}
        </div>
      </Modal.Body>
      {/* <Modal.Body>
        <div className="maps-main-container  px-3 my-3">
          <div
            className={
              treatmentServicesList.length > 0
                ? "p-3 map-left-container"
                : "p-3 map-no-data-left-container"
            }
          >
            {treatmentServicesList && treatmentServicesList.length > 0 ? (
              treatmentServicesList.map((service, index) => (
                <div className="mb-3" key={index}>
                  <h5>{service.establishmentName}</h5>
                  <p className="m-0">{service.categoryName}</p>
                  <p className="m-0">Opening Time: {service.openTime}</p>
                  <p className="m-0">Closing Time: {service.closeTime}</p>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center ">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="/no-locations.png"
                    alt="no-locations"
                    className="no-location-image"
                  />
                  <p
                    style={{
                      color: "#4d4dff",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    No Locations Found
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="map-right-container">
            <div className="flex justify-center">
              {apiIsLoaded && isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={1}
                  onClick={() => setActiveMarker(null)}

                  // onLoad={onLoad}
                  // onUnmount={onUnmount}
                >
                  {transformedData.map(({ id, name, position }) => (
                    <MarkerF
                      key={id}
                      position={position}
                      onClick={() => handleActiveMarker(id)}
                      icon={{
                        url: "/lavender-logo.png",
                        scaledSize: new window.google.maps.Size(22, 22),
                        anchor: new window.google.maps.Point(14, 38),
                      }}
                    >
                      {activeMarker === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                          <div
                            style={{
                              width: "150px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              textAlign: "center",
                            }}
                          >
                            <p className="text-base text-gray-600 font-semibold">
                              {name}
                            </p>
                          </div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}

                  <MarkerF
                    position={center}
                    icon={{
                      url: "/google-maps.png",
                      scaledSize: new window.google.maps.Size(30, 30),
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
          </div>
        </div>
      </Modal.Body> */}
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
