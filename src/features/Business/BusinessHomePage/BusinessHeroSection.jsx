
import { LANDING_PAGE_BUSINESS } from "../../../constants/constants";
import { Typography } from "@mui/material";
import Text from "../../../components/Text";
import ButtonRouter from "../../../components/ButtonRouter";

const BusinessHeroSection = () => {

    return (
        <section className="hero-section" style={{ paddingBottom: "150px" }}>
            <section className="hero-content">
                <Text
                    sx={styles.title}
                    className="!text-5xl md:!text-[5rem] pb-5"
                    name={LANDING_PAGE_BUSINESS?.TITLE}
                />
                <Text
                    className="hero-title urbanist-font "
                    variant="body1"
                    name={LANDING_PAGE_BUSINESS?.SUBTITLE}
                />

                <ButtonRouter
                    sx={{
                        width: "180px",
                        height: "45px",
                        fontFamily: "Urbanist",
                        borderRadius: "10px",
                        fontSize: "20px",
                        "@media (max-width: 600px)": {
                            fontSize: "16px",
                            width: "140px",
                        },
                    }}
                    name={"Join for free"}
                    to="/business/Register"
                />

                <Typography
                    sx={{
                        ...styles.subTitle,
                        // position: "absolute",
                        // top: { xs: "50vh", sm: "18vh" },
                        // left: "50%",
                        // transform: "translateX(-50%)",
                        fontSize: { xs: "34px", sm: "45px" },
                        lineHeight: { xs: "30px", sm: "54px" },
                        width: "100%",
                        paddingTop: "50px",
                        fontWeight: "700"
                    }}
                    className="hero-subtitle"
                >
                    Take your Salon business
                    <br />
                    to next level
                </Typography>
            </section>
        </section>
    );
};

export default BusinessHeroSection;

const styles = {
    title: {
        fontFamily: "Urbanist",
        // fontSize: "90px",
        fontWeight: 500,
        // lineHeight: "108px",
        color: "#4D4D4D",
    },
};
