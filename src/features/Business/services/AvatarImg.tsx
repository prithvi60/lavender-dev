import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";

const AvatarImg = ({ row, employeeData }): any => {
  const [imageUrl, setImageUrl] = useState("");
  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  function getProfileImage(rowId) {
    const employee = employeeData?.find((emp) => emp?.employeeId === rowId);
    return employee ? employee?.profileImage : "";
  }

  useEffect(() => {
    const imgId = getProfileImage(row);
    const fetchImageUrl = async () => {
      const url = await fetchImage(imgId, establishmentId);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [row]);

  const fetchImage = async (image, establishmentId) => {
    try {
      const response = await endpoint.getImages(image, establishmentId);

      const imageUrl: string = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {}
  };

  return (
    <div className="flex items-center">
      <Avatar src={imageUrl} style={{ backgroundColor: "#1B1464" }} />
      <div className="ml-2">{row?.original?.employeeName}</div>
    </div>
  );
};

export default AvatarImg;
