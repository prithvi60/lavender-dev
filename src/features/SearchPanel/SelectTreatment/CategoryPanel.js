import React, { useEffect, useState } from "react";
// import { categories } from "../../../constants/constants.js";
import GetImage from "../../../assets/GetImage.tsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateSearchTreatment } from "../../../store/slices/searchPageSlice.js";
import endpoint from "../../../api/endpoints.ts";

const CategoryPanel = () => {
  const { treatmentList } = useSelector((state) => state.searchPage);

  const dispatch = useDispatch();

  const [clickedImages, setClickedImages] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);


  const handleClick = (item) => {
    if (clickedImages.includes(item)) {
      setClickedImages(
        clickedImages.filter((clickedIndex) => clickedIndex !== item)
      );
      dispatch(
        updateSearchTreatment({
          treatment: treatmentList.filter((treatment) => treatment !== item),
        })
      );
    } else {
      setClickedImages([...clickedImages, item]);
      dispatch(updateSearchTreatment({ treatment: [...treatmentList, item] }));
    }
  };

  const isClicked = (name) => clickedImages.includes(name);

  const getCategoriesList = async () => {
    try {
      const categoriesServicesResponse =
        await endpoint.getCategoryServicesList();

      setAvailableCategories(categoriesServicesResponse?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const categories = availableCategories.map(
    (category) => category.categoryName
  );

  return (
    <div className="category-grid cursor-pointer">
      {categories.map((item, index) => (
        <div
          key={index}
          className={`category-container ${isClicked(item) ? "clicked" : ""}`}
          onClick={() => handleClick(item)}
        >
          {/* <GetImage className="cursor-pointer" imageName={item} /> */}
          <p>{item}</p>
          {isClicked(item) && (
            <div className="close-button" onClick={() => handleClick(item)}>
              X
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryPanel;
