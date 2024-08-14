import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";
import Text from "../../../components/Text";
import { convertDateToReadAbleDate } from "../../../utils/TimeFormat";

export const PublishedSalonProfile = ({
  basicInfo,
  estImages,
  lastModified,
}) => {
  // console.log("basicInfo : ", basicInfo)
  // console.log("estImages : ", lastModified)

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId =
    userDetails != null ? userDetails?.establishmentId : "";

  const [imageUrls, setImageUrls] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(5);

  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(image, establishmentId);

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of estImages) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (estImages?.length > 0) {
      callFetchImageApi();
    }
  }, [estImages]);

  return (
    <>
      {loading ? (
        // <Skeleton variant="rectangular" width={"200px"} height={"150"} />
        <p className="flex items-center justify-center w-full h-[30vh] text-xl capitalize animate-pulse">
          loading...
        </p>
      ) : (
        <Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {
                imageUrls?.length > 5 && 
                <p
                className="w-full text-lg text-right underline capitalize cursor-pointer underline-offset-4"
                onClick={() => setMore(imageUrls?.length + 1)}
              >
                2+ more
              </p>
              }
              
              {imageUrls?.slice(0, more).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Images ${index}`}
                  style={{
                    width: "200px",
                    height: "140px",
                    borderRadius: isMobile ? "0" : "20px",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Text name={basicInfo?.establishmentName} />
            <Text name={basicInfo?.cityCode} />
            <Text
              name={`Last updated on ${
                lastModified ? convertDateToReadAbleDate(lastModified) : ""
              }`}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
