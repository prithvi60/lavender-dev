import React, { Fragment, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Text from "../../components/Text";
import Chip from "../../components/Chip";
import {
  updateSearchLocationList,
  updateSearchSelectedBox,
} from "../../store/slices/searchPageSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { MdMyLocation } from "react-icons/md";

const LocationPanel = () => {
  const { locationList } = useSelector((state: any) => state.searchPage);
  const dispatch = useDispatch();

  const [inputLocation, setInputLocation] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [center, setCenter] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const TempLocationList = ["Location 1", "Location 2", "Location 3"];

  const handleOnChange = (value) => {
    const dataTemp = [...locationList, value];
    dispatch(updateSearchLocationList({ locationList: dataTemp }));
  };

  const handleTagSelect = (tag) => {
    // Check if the tag already exists in the newTags list
    const tagAlreadyExists = locationList?.some(
      (existingTag) => existingTag === tag
    );

    if (!tagAlreadyExists) {
      handleOnChange(tag);
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = locationList?.filter((item) => item !== tag);
    // handleOnChange('treatments', updatedTags);
    dispatch(updateSearchLocationList({ locationList: updatedTags }));
  };

  const closeFilterPannel = () => {
    dispatch(updateSearchSelectedBox({ selectedBox: "" }));
  };

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
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error(
                "Error getting geolocation: User denied Geolocation"
              );
              alert(
                "Location access is required for this feature. Please enable it in your browser settings."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              console.error(
                "Error getting geolocation: Location information is unavailable"
              );
              alert(
                "Location information is currently unavailable. Please try again later."
              );
              break;
            case error.TIMEOUT:
              console.error(
                "Error getting geolocation: The request to get user location timed out"
              );
              alert(
                "The request to get your location timed out. Please try again."
              );
              break;
            default:
              console.error(
                "Error getting geolocation: An unknown error occurred"
              );
              alert(
                "An unknown error occurred while trying to access your location. Please try again."
              );
              break;
          }
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

  return (
    <div className="home-treatments-filter">
        <input
          type="search"
          placeholder="Search for your location/society/locality"
          className="p-2 w-full border rounded-md mb-2"
          // onChange={searchByLocation}
        />
      <Text
        variant="body1"
        align="left"
        className="bold"
        name="Choose your Location"
      />
      <div className="treatment-grid">
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {locationList?.map((tag, index) => {
              return (
                <Grid item key={index}>
                  <Chip
                    type={"deletable"}
                    className="delete"
                    label={tag}
                    onDelete={() => handleTagRemove(tag)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            {TempLocationList?.map((tag, index) => (
              <Grid item key={index}>
                <Chip
                  type={"clickable"}
                  label={tag}
                  // onClick={() => handleTagSelect(tag)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <div
          className="flex items-center cursor-pointer"
          style={{ color: "blueviolet" }}
          // onClick={() => getCurrentLocation(props.onHide)}
        >
          <MdMyLocation size={18} className="mr-2" />
          <span className="text-base font-semibold">Use current location</span>
        </div>
      </div>
    </div>
  );
};

export default LocationPanel;

const styles = {
  header: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#4D4D4D",
  },
};
