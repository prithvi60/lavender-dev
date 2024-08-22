import React from "react";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { convertTo_HH_AM } from "../utils/TimeFormat.ts";
import { Box } from "@mui/material";
import GetIcon from "../assets/Icon/icon.tsx";

const NavFilter = ({ setshowSearchBar }) => {
  const { treatmentList, locationList, selectedDate, SelectedTime } =
    useSelector((state: any) => state.searchPage);

  const onClickHandle = () => {
    setshowSearchBar((prev) => !prev);
  };

  console.log(treatmentList);


  return (
    <Box
      id="navdiv"
      className="mx-auto cursor-pointer filtered-panel w-max"
      onClick={() => onClickHandle()}
      sx={{ "@media (max-width: 600px)": { width: "100%" } }}
    >

      {treatmentList && treatmentList.length === 0 ? (<div className="filtered-items"><GetIcon iconName="TreatmentHeartIcon" /><p className="mb-0 !px-0 hidden sm:block">Treatment</p></div>) : (<div className="filtered-items"><p className="m-0">{treatmentList?.toString().replaceAll(",", ", ")}</p></div>)}

      {treatmentList && treatmentList.length === 0 ? (<div className="filtered-items"><GetIcon iconName="LocationIcon" /><p className="mb-0 !px-0 hidden sm:block">Location</p></div>) : (<div className="filtered-items"><p className="m-0">{locationList[0]?.location?.toString().replaceAll(",", ", ")}</p></div>)}

      {treatmentList && treatmentList.length === 0 ? (<div className="filtered-items"><GetIcon iconName="CalendarIcon" /><p className="mb-0 !px-0 hidden sm:block">selectedDate</p></div>) : (<div className="filtered-items"><p className="m-0">{selectedDate}</p></div>)}

      {treatmentList && treatmentList.length === 0 ? (<div className="filtered-items gap-1"><GetIcon iconName="AccessTimeFilledIcon" /><p className="mb-0 !px-0 hidden sm:block">SelectedTime</p><div className="icon-wrapper">
          <Search />
        </div></div>) : (
        <div className="filtered-items">
        {SelectedTime.from === "" && SelectedTime.to === "" ? (
          ""
        ) : (
          <p className="m-0">{`${SelectedTime?.from} - ${SelectedTime?.to}`}</p>
        )}
        <div className="icon-wrapper">
          <Search />
        </div>
      </div>)}

      {/* <div className="filtered-items">
        <p className="m-0">
          {locationList[0]?.location?.toString().replaceAll(",", ", ")}
        </p>
      </div>
      <div className="filtered-items">
        <p className="m-0">{selectedDate}</p>
      </div>
      <div className="filtered-items">
        {SelectedTime.from === "" && SelectedTime.to === "" ? (
          ""
        ) : (
          <p className="m-0">{`${SelectedTime?.from} - ${SelectedTime?.to}`}</p>
        )}
        <div className="icon-wrapper">
          <Search />
        </div>
      </div> */}
    </Box>
  );
};

export default NavFilter;

// {`${SelectedTime?.from} - ${SelectedTime?.to}`}
