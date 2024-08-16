import React from "react";
import { LANDING_PAGE } from "../../constants/constants";
import NewSearchPanel from "../SearchPanel/NewSearchPanel";
import { Box } from "@mui/material";
import Text from "../../components/Text";

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ paddingBottom: "150px" }}>
      <section className="hero-content">
        <Text sx={styles.title} name={LANDING_PAGE?.TITLE} />
        <Text
          className="hero-title urbanist-font "
          variant="body1"
          name={LANDING_PAGE?.SUBTITLE}
        />
  
        <Box
          sx={{
            paddingBottom: 7,
            paddingTop: 3,
            paddingLeft: 7,
            paddingRight: 7,
          }}
        >
          <NewSearchPanel />
        </Box>
      </section>
    </section>
  );
};

export default HeroSection;

const styles = {
  title: {
    fontFamily: "Urbanist",
    fontSize: "90px",
    fontWeight: 500,
    lineHeight: "108px",
    color: "#4D4D4D",
  },

};
