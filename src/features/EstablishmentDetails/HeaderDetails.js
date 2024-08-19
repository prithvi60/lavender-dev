import { Grid, Chip, styled, IconButton, Box, Rating } from "@mui/material";
import React, { useState } from "react";
import Text from "../../components/Text";
import Buttons from "@mui/material/Button";
import ServiceDialog from "../ServiceDialog/ServiceDialog";
import "./style.css";
import GetIcon from "../../assets/Icon/icon";

function HeaderDetails(props) {
  const [selectedHref, setSelectedHref] = useState("pictures");
  const { isLoading, establishmentData } = props;

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <>
      {!isLoading && (
        <>
          <Box sx={{ mx: 8, "@media (max-width: 640px)": { mx: 4 } }}>
            {/* New section for image, title, review, and establishment name */}
            <Box sx={{ mt: 4, mb: { xs: 1, md: 2 } }}>
              <Box
                className="text-3xl font-bold min-[1200px]:hidden block"
                id="SearchDetailPicture"
              >
                {establishmentData?.profile?.establishmentName}
              </Box>
            </Box>
            <div className="hidden min-[1200px]:flex justify-between min-[1200px]:gap-3">
              <Box sx={{ mt: 4, mb: { xs: 1, md: 2 } }}>
                <Box className="text-3xl font-bold" id="SearchDetailPicture">
                  {establishmentData?.profile?.establishmentName}
                </Box>
              </Box>
              <div className="hidden search-header-container min-[1200px]:block">
                <Box
                  className="items-center search-detail-chips"
                  // sx={{'@media (max-width: 640px)': {marginTop: '0px !important'}, '@media (max-width: 550px)': {marginTop: '100px !important'}}}
                >
                  <a
                    onClick={() => setSelectedHref("pictures")}
                    href="#"
                    className={`${selectedHref === "pictures" ? "active" : ""}`}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      Pictures
                    </Buttons>
                  </a>
                  <a
                    onClick={() => setSelectedHref("service")}
                    href="#SearchDetailService"
                    className={selectedHref === "service" ? "active" : ""}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      {" "}
                      services
                    </Buttons>
                    {/* <ServiceDialog establishmentData={establishmentData} /> */}
                  </a>
                  <a
                    onClick={() => setSelectedHref("review")}
                    href="#SearchDetailReview"
                    className={selectedHref === "review" ? "active " : ""}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      Review
                    </Buttons>
                  </a>
                  <a
                    onClick={() => setSelectedHref("about")}
                    className={selectedHref === "about" ? "active" : ""}
                    href="#SearchDetailAbout"
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      About
                    </Buttons>
                  </a>
                </Box>
              </div>
            </div>

            {/*  REVIEW SECTION */}
            <div className="block min-[1200px]:flex">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 2, md: 0 },
                }}
              >
                <StyledRating
                  name="read-only"
                  value={
                    establishmentData?.profile?.data?.rating?.ratingStar || 0
                  }
                  readOnly
                  precision={0.5}
                />
                <Text sx={{ ml: 1 }}>
                  ({establishmentData?.profile?.data?.rating?.ratingCount || 0})
                </Text>
                <Text sx={{ ml: 2, color: "text.secondary" }}>
                  {establishmentData?.profile?.cityCode}
                </Text>
              </Box>

              <div className="search-header-details" style={{ padding: 0 }}>
                <IconButton>
                  <GetIcon iconName="heartFilled" />
                </IconButton>
                <Chip
                  label={"Opens at " + establishmentData?.profile?.data?.geoX}
                  sx={{ fontSize: "14px" }}
                  className="header-chip"
                />
                <Chip
                  label={establishmentData?.profile?.cityCode}
                  sx={{ fontSize: "14px" }}
                  className="header-chip"
                />
                <div className="search-chips-container">
                  <Grid>
                    <Chip
                      sx={{ fontSize: "14px" }}
                      label={"Instant Booking"}
                      value={"Instant Booking"}
                    />
                    <Chip
                      sx={{ fontSize: "14px" }}
                      label={"Free Cancellation"}
                      value={"Free Cancellation"}
                    />
                  </Grid>
                </div>
              </div>

              <div className="search-header-container  min-[1200px]:!hidden">
                <Box
                  className="search-detail-chips"
                  // sx={{
                  //   "@media (min-width: 1201px)": { display: "block" },
                  //   "@media (max-width: 1200px)": { display: "hidden" },
                  // }}
                >
                  <a
                    onClick={() => setSelectedHref("pictures")}
                    href="#"
                    className={selectedHref === "pictures" ? "active" : ""}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      Pictures
                    </Buttons>
                  </a>
                  <a
                    onClick={() => setSelectedHref("service")}
                    href="#SearchDetailService"
                    className={selectedHref === "service" ? "active" : ""}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      services
                    </Buttons>
                    {/* <ServiceDialog establishmentData={establishmentData} /> */}
                  </a>
                  <a
                    onClick={() => setSelectedHref("review")}
                    href="#SearchDetailReview"
                    className={selectedHref === "review" ? "active" : ""}
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      Review
                    </Buttons>
                  </a>
                  <a
                    onClick={() => setSelectedHref("about")}
                    className={selectedHref === "about" ? "active" : ""}
                    href="#SearchDetailAbout"
                  >
                    <Buttons sx={styles.btn} variant="outlined">
                      About
                    </Buttons>
                  </a>
                </Box>
              </div>
            </div>
          </Box>
        </>
      )}
    </>
  );
}

export default HeaderDetails;

const styles = {
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: { xs: "8px 16px", sm: "10px 20px" },
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
  },
};
