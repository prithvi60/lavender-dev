import { Button, Card, TextField } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"; // Add Google Maps imports
import { startTransition, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as yup from "yup";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";
import Buttons from "../../../../components/Button";
import { updateUser } from "../../../../store/slices/currentUserSlice";
import { useDispatch } from "react-redux";
export const FormStep1 = ({ setActiveStep }) => {
  const location = useLocation();

  const userDetails: any = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId: any =
    userDetails != null ? userDetails?.establishmentId : "";

  const BusinessInfoSchema = yup.object().shape({
    salonName: yup
      .string()
      .required("Salon name is required")
      .min(2, "Salon name must be at least 2 characters"),
    location: yup.string(),
    geoX: yup.number(),
    geoY: yup.number(),
  });

  const [basicInfo, setBasicInfo] = useState<any>("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [center, setCenter] = useState(null); // State for map center
  const [salonLoc, setSalonLoc] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const { isLoaded: apiIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  // Initialize useForm
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BusinessInfoSchema), // Use your validation schema
    defaultValues: {
      salonName: "", // Add default values for your fields
      location: "",
      // Add other fields as necessary
    },
  });

  const handleSaveButton = async (data) => {
    const payLoad = {
      id: establishmentId ? establishmentId : "",
      profile: {
        establishmentName: data?.salonName,
        establishmentAbout: data?.establishmentAbout,
        phoneExtension: data?.phoneExtension,
        phoneNumber: data?.phoneNumber,
        areaCode: data?.areaCode,
        doorNo: data?.doorNo,
        zipCode: data?.zipCode,
        cityCode: data?.location,
        location: data?.location,
        //location: salonLoc,
        stateCode: data?.stateCode,
        locationTitle: data?.locationTitle,
        geoX: data?.geoX,
        geoY: data?.geoY,
      },
    };

    try {
      const response = await endpoint.saveEstablishmentProfile(payLoad);
      if (response.data.success) {
        //setActiveStep((prevStep) => prevStep + 1);
        console.log("Profile saved.");
      } else {
        console.error("Error saving employee:", response.data.message);
        alert("There was an issue saving. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
    //   remove later
    setActiveStep((prevStep) => prevStep + 1);
  };

  const getLocationsBasedOnBasicInfo = async (lat, lng) => {
    if (lat && lng) {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].formatted_address;
        setValue("location", location);
      }
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    if (basicInfo && basicInfo?.geoX && basicInfo?.geoY) {
      const geoXNumber = parseFloat(basicInfo?.geoX);
      const geoYNumber = parseFloat(basicInfo?.geoY);
      setCenter({ lat: geoXNumber, lng: geoYNumber });

      getLocationsBasedOnBasicInfo(geoXNumber, geoYNumber);
    } else {
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
              //setValue("location", location);
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
    }
  }, [setValue, basicInfo]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenter({ lat, lng });
    setValue("geoX", lat);
    setValue("geoY", lng);

    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    );

    const geocodeData = await geocodeResponse.json();

    if (geocodeData.results && geocodeData.results.length > 0) {
      const location = geocodeData.results[0].formatted_address;
      setValue("location", location);
    }
  };

  const handleSearch = async () => {
    if (searchQuery) {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const { lat, lng } = geocodeData.results[0].geometry.location;
        setCenter({ lat, lng });
        setValue("location", geocodeData.results[0].formatted_address);
        setValue("geoX", lat);
        setValue("geoY", lng);
      } else {
        console.error("No results found for the given location.");
      }
    }
  };

  useEffect(() => {
    let timeOutId;

    const handleSearchInput = () => {
      handleSearch();
    };

    if (searchQuery && searchQuery.length >= 2) {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        handleSearchInput();
      }, 2000);
    }

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        establishmentId
      );
      if (establishmentData?.data?.success) {
        setBasicInfo(establishmentData?.data?.data?.profile);
        setValue(
          "salonName",
          establishmentData?.data?.data?.profile?.establishmentName
        );
        setValue("location", establishmentData?.data?.data?.profile?.location);
        setValue("geoX", establishmentData?.data?.data?.profile?.geoX);
        setValue("geoY", establishmentData?.data?.data?.profile?.geoY);
        //setSalonLoc(establishmentData?.data?.data?.profile?.cityCode)
      }
    };
    // const response: any = endpoint.getCurrentUserDetails();
    // const userDetails: any = response?.data;
    // dispatch(updateUser(userDetails?.data));

    getEstablishmentDetails();
  }, []);

  return (
    <>
      <section
        className="w-full flex justify-center items-center flex-1 overflow-y-auto pt-64"
        style={{ height: "80vh" }}
      >
        <div style={{ width: "50%", padding: "0px 20px" }}>
          <h5 className="text-sm mb-2.5 mt-3">Step 1</h5>
          <h4 className="text-xl md:text-3xl tracking-wide mb-2 font-bold">
            Tell us about your business
          </h4>
          <h4 className="text-base md:text-base tracking-wide mb-10 ml-2">
            Enter the Salon name and location
          </h4>
          <TextField
            {...register("salonName")}
            id="outlined-basic"
            size="medium"
            sx={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "0.5rem !important",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.6rem",
              },
            }}
            placeholder="Salon Name"
            variant="outlined"
            error={!!errors.salonName} // Show error state
            helperText={errors.salonName ? errors.salonName.message : ""} // Show error message
          />
          <TextField
            {...register("location")} // Bind to useForm
            id="outlined-basic"
            size="medium"
            sx={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "0.5rem !important",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.6rem",
              },
            }}
            placeholder="Address"
            variant="outlined"
            // value={salonLoc}
            // onChange={(e) => setSalonLoc(e.target.value)}
            //onBlur={handleLocationSearch}
            error={!!errors.location} // Show error state
            helperText={errors.location ? errors.location.message : ""} // Show error message
          />
          <TextField
            sx={{
              width: "100%",
              paddingBottom: "20px",
              color: "#B3B3B3",
              marginTop: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.6rem",
              },
            }}
            type="search"
            size="medium"
            placeholder="Search for location"
            variant="outlined"
            value={searchQuery} // Bind to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            onBlur={handleSearch} // Call search on blur
          />
          <Card sx={{ width: "100%" }}>
            {apiIsLoaded && isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={center || { lat: 0, lng: 0 }}
                zoom={10}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                <MarkerF
                  position={center}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                  onLoad={(marker) => {
                    console.log(marker);
                  }}
                  icon={{
                    // url: "googleMaps.png",
                    url: "https://res.cloudinary.com/djoz0tmyl/image/upload/v1722526805/googleMaps_ydgvvh.png",

                    scaledSize: new google.maps.Size(35, 35),
                  }}
                />
              </GoogleMap>
            ) : (
              <div>Loading...</div>
            )}
          </Card>
        </div>
      </section>
      <footer
        className="w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white"
        style={{ height: "10vh" }}
      >
        <Button
          variant="text"
          size="large"
          sx={{
            textTransform: "none",
            color: "#825FFF",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          onClick={() =>
            startTransition(() => {
              window.history.back();
            })
          }
        >
          Back
        </Button>
        <Buttons
          sx={{
            borderRadius: "10px",
            padding: "10px 40px 10px 40px",
            textTransform: "none",
            fontSize: "18px",
            fontWeight: 600,
            "@media (max-width: 600px)": {
              padding: "10px 20px 10px 20px",
              fontSize: "14px",
            },
          }}
          variant="contained"
          onClick={handleSubmit(handleSaveButton)}
          name={"Proceed"}
        >
          {" "}
        </Buttons>
      </footer>
    </>
  );
};
