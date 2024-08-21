import { TextField } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"; // Add Google Maps imports
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const FormStep1 = () => {

    const location = useLocation();

    // const [isLoaded, setIsLoaded] = useState(false);
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [salonName, setSalonName] = useState(""); // Add state for salon name
    const [center, setCenter] = useState({ lat: 0, lng: 0 }); // State for map center
    // const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, // Ensure you have your API key
    });

    const handleMarkerDragEnd = async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCenter({ lat, lng });
        // setValue("geoX", lat);
        // setValue("geoY", lng);
    
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );
    
        const geocodeData = await geocodeResponse.json();
    
        if (geocodeData.results && geocodeData.results.length > 0) {
          const location = geocodeData.results[0].formatted_address;
        //   setValue("location", location);
        }
      };
    const handleLocationSearch = async () => {
        const response = await fetch(`API_URL?query=${salonName}`);
        const data = await response.json();
        // setLocation(data.location); // Update location based on API response
        setCenter({ lat: data.geoX, lng: data.geoY }); // Update map center
    };

    const handleSearch = async () => {
        if (searchQuery) {
            const geocodeResponse = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
            );
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.results && geocodeData.results.length > 0) {
                const { lat, lng } = geocodeData.results[0].geometry.location;
                setCenter({ lat, lng });
                // setLocation(geocodeData.results[0].formatted_address);
                setSalonName(geocodeData.results[0].formatted_address); // Optional: Set salon name to the selected location
            } else {
                console.error("No results found for the given location.");
            }
        }
    };

    return (
        <section className='w-full flex justify-center items-center flex-1 overflow-y-auto pt-64' style={{ height: "80vh" }}>
            <div style={{ width: "50%", padding: "0px 20px" }}>
                <h5 className='text-sm mb-2.5'>Step 1</h5>
                <h4 className="tetx-xl md:text-4xl tracking-wide mb-10 font-bold">Tell us about your business</h4>
                <h5 className='text-lg mb-2.5'>Enter the Salon name and location</h5>

                <TextField 
                    id="outlined-basic" 
                    size="medium" 
                    sx={{ width: "100%", marginTop: "10px" }} 
                    label="Salon Name" 
                    variant="outlined" 
       
                />
                <TextField 
                    id="outlined-basic" 
                    size="medium" 
                    sx={{ width: "100%", marginTop: "10px" }} 
                    label="Address" 
                    variant="outlined" 
                    value={salonName} 
                    onChange={(e) => setSalonName(e.target.value)} 
                    onBlur={handleLocationSearch} 
                />
                <TextField
                    sx={{
                        width: "100%",
                        paddingBottom: "20px",
                        color: "#B3B3B3",
                        marginTop: "20px"
                    }}
                    type="search"
                    size="medium"
                    label="Search for location"
                    variant="outlined"
                    value={searchQuery} // Bind to state
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    onBlur={handleSearch} // Call search on blur
                />
                {isLoaded && (
                    <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "400px" }}
                            center={center || { lat: 0, lng: 0 }}
                            zoom={10}
                            options={{
                                mapTypeControl: false,
                                streetViewControl: false,
                              }}
                        >
                            <MarkerF     position={center}
    draggable
    onDragEnd={handleMarkerDragEnd}
    onLoad={(marker) => {
      console.log(marker);
    }}
    icon={{
      // url: "googleMaps.png",
      url: "https://res.cloudinary.com/djoz0tmyl/image/upload/v1722526805/googleMaps_ydgvvh.png",

      scaledSize: new google.maps.Size(35, 35),
    }}/>
                        </GoogleMap>
                    </div>
                )}
            </div>
        </section>
    )
}