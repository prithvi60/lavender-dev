import React from "react";
import { LANDING_PAGE } from "../../constants/constants";
import NewSearchPanel from "../SearchPanel/NewSearchPanel";
import { Box } from "@mui/material";
import Text from "../../components/Text";
import { useLocation } from "react-router-dom";

const HeroSection = () => {
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname);

  return (
    <section className="hero-section" style={{ paddingBottom: "150px" }}>
      <section className="hero-content">
        <Text
          sx={styles.title}
          className="!text-5xl md:!text-[5rem]"
          name={LANDING_PAGE?.TITLE}
        />
        <Text
          className="hero-title urbanist-font "
          variant="body1"
          name={LANDING_PAGE?.SUBTITLE}
        />

        <Box
          sx={{
            // paddingBottom: 7,
            paddingTop: 7,
            paddingLeft: 7,
            paddingRight: 7,

            "@media (max-width: 600px)": {
              padding: "35px 20px 0px 20px",
            },
          }}
        >
          <NewSearchPanel pathname={pathname} />
        </Box>
      </section>
    </section>
  );
};

export default HeroSection;

const styles = {
  title: {
    fontFamily: "Urbanist",
    // fontSize: "90px",
    fontWeight: 500,
    // lineHeight: "108px",
    color: "#4D4D4D",
  },
};
