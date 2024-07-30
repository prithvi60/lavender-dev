import React, { useEffect, useState } from "react";
import Buttons from "../../../../components/Button";
import { publish } from "../../../../api/constants";
import endpoint from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Modal, Box } from "@mui/material";
import GetIcon from "../../../../assets/Icon/icon";
import { useSnackbar } from "../../../../components/Snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px",
  boxShadow: 24,
  p: 4,
  borderradius: "2px",
};

export const Publish = ({ userDetails, setIsOpen, setMembershipScreen }) => {
  const [isPublish, setIsPublish] = useState(false);
  const navigate = useNavigate();
  const [showPublish, setShowPublish] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  const showSnackbar = useSnackbar();

  const {
    data: establishmentData,
    isLoading: isLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["query-establishment-details"],
    queryFn: () => {
      return endpoint.getEstablishmentDetailsById(userDetails?.establishmentId);
    },
  });

  useEffect(() => {
    if (
      establishmentData?.data?.data?.estImages?.length > 0 &&
      establishmentData?.data?.data?.availableDays?.length > 0
    ) {
      setIsDisabled(false);
    }
    setImageIdList(establishmentData?.data?.data?.estImages);
    setIsPublish(establishmentData?.data?.data?.published);
  }, [establishmentData]);

  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(
        image,
        establishmentData?.data?.data?.id
      );

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList]);

  const publishEstablishment = async (payLoad) => {
    try {
      const response = await endpoint.publishEstablishment(payLoad); // Call the async function to get user details
      const res = response?.data; // Assuming response.data contains the user details
    } catch (error) {
      console.error("Error fetching user details:", error); // Handle any errors that occur
    }
  };

  function onClickPreview() {
    navigate(
      `/salon/${userDetails != null ? userDetails?.establishmentId : ""}`
    );
  }

  function handlePublishClick() {
    setIsPublish(true);
    setOpen((prev) => !prev);
  }

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  useEffect(() => {
    if (isPublish) {
      const payLoad = {
        id: userDetails != null ? userDetails?.establishmentId : "",
        published: isPublish,
      };
      publishEstablishment(payLoad);
    }
  }, [isPublish]);

  const checkEstablishmentSubscriptionStatus = async () => {
    try {
      const response = await endpoint.checkSubscriptionStatus(
        userDetails?.establishmentId
      );

      setIsAlreadySubscribed(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkEstablishmentSubscriptionStatus();
  }, []);

  const onClickCheckOut = () => {
    if (isAlreadySubscribed) {
      showSnackbar("User already have Membership");
      // navigate("/");
    } else {
      setIsOpen(false);
      setMembershipScreen(true);
    }
  };

  return (
    <div className="w-full">
      {loading && <p>Loading...</p>}
      <div className="flex justify-center">
        <img
          src={imageUrls[0]}
          style={{ width: "300px", height: "200px", margin: "10px" }}
          alt="Establishment"
        />
      </div>

      <div
        className="text-5xl font-bold text-center p-4"
        style={{ color: "#4D4D4D" }}
      >
        {establishmentData?.data?.data?.profile?.establishmentName} profile is
        created
      </div>
      {!isPublish && (
        <div
          className="text-xl font-normal text-center p-4"
          style={{ color: "#4D4D4D" }}
        >
          You can publish now to make it available for everyone
        </div>
      )}

      <div className="flex justify-center">
        <div className="flex justify-center flex-col w-72">
          {!isPublish && (
            <Buttons
              disabled={isDisabled}
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "10px",
                padding: "10px 40px 10px 40px",
                marginBottom: "10px",
              }}
              name={"Publish"}
              onClick={() => {
                handlePublishClick();
              }}
            ></Buttons>
          )}
          <div className="flex justify-between ">
            <Buttons
              variant="outlined"
              sx={{ borderRadius: "10px", padding: "10px 40px 10px 40px" }}
              name={"Preview"}
              onClick={() => onClickPreview()}
            ></Buttons>
            <Buttons
              variant="outlined"
              sx={{ borderRadius: "10px", padding: "10px " }}
              name={"Membership"}
              onClick={() => onClickCheckOut()}
              disabled={!isPublish}
            ></Buttons>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-3xl filter-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GetIcon
              onClick={() => {}}
              className="my-5 mx-16 p-1 cursor-pointer rounded-sm"
              iconName="CalendarConfirmedIcon"
            />
            <div id="title" className="font-bold text-xl mb-3">
              Dear {userDetails?.fullName}
            </div>
            <div>Your establishment has been published</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
