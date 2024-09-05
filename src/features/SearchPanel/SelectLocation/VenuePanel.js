import React, { useEffect, useState } from "react";
// import { categories } from "../../../constants/constants.js";
import GetImage from "../../../assets/GetImage.tsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateSearchLocation } from "../../../store/slices/searchPageSlice.js";
import endpoint from "../../../api/endpoints.ts";

const VenuePanel = () => {
  const { locationList } = useSelector((state) => state.searchPage);

  const dispatch = useDispatch();

  const [clickedImages, setClickedImages] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  console.log(clickedImages, "ok");

  const venues = ["Venue 1", "Venue 2", "Venue 3"];

  const handleClick = (item) => {
    if (clickedImages.includes(item)) {
      setClickedImages(
        clickedImages.filter((clickedIndex) => clickedIndex !== item)
      );
      dispatch(
        updateSearchLocation({
          location: locationList.filter((location) => location !== item),
        })
      );
    } else {
      setClickedImages([...clickedImages, item]);
      dispatch(updateSearchLocation({ location: [...locationList, item] }));
    }
  };

  const isClicked = (name) => clickedImages.includes(name);

  // const getCategoriesList = async () => {
  //   try {
  //     const categoriesServicesResponse =
  //       await endpoint.getCategoryServicesList();

  //     setAvailableCategories(categoriesServicesResponse?.data?.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getCategoriesList();
  // }, []);

  // const categories = availableCategories.map(
  //   (category) => category.categoryName
  // );

  return (
    <div className="category-grid cursor-pointer">
      {venues.map((item, index) => (
        <div
          key={index}
          className={`category-container ${isClicked(item) ? "clicked" : ""}`}
          // onClick={() => handleClick(item)}
        >
          {/* <GetImage className="cursor-pointer" imageName={item} /> */}
          <p>{item}</p>
          {isClicked(item) && (
            <div
              className="close-button"
              // onClick={() => handleClick(item)}
            >
              X
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VenuePanel;
