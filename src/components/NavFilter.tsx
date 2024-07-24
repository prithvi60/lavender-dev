import React from "react";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { convertTo_HH_AM } from "../utils/TimeFormat.ts";

const NavFilter = ({ setshowSearchBar }) => {
  const { treatmentList, locationList, selectedDate, SelectedTime } =
    useSelector((state: any) => state.searchPage);

  const onClickHandle = () => {
    setshowSearchBar((prev) => !prev);
  };

  return (
    <div
      id="navdiv"
      className="filtered-panel ml-auto cursor-pointer"
      onClick={() => onClickHandle()}
    >
      <div className="filtered-items">
        <p className="m-0">{treatmentList?.toString().replaceAll(",", ", ")}</p>
      </div>
      <div className="filtered-items">
        <p className="m-0">
          {locationList[0]?.location?.toString().replaceAll(",", ", ")}
        </p>
      </div>
      <div className="filtered-items">
        <p className="m-0">{selectedDate}</p>
      </div>
      <div className="filtered-items">
        <p className="m-0">{`${SelectedTime?.from} - ${SelectedTime?.to}`}</p>{" "}
        <div className="icon-wrapper">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default NavFilter;
