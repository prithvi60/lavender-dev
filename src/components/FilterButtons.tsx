import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import { CircleCheckIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { bookingStatusFilters } from "../constants/constants";



const FilterButtons = ({ label, options, selectOptionHandler }) => {
  const allOptions = bookingStatusFilters;


  const handleToggle = (value) => {
    const currentIndex = options.indexOf(value);
    const newChecked = [...options];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    selectOptionHandler(newChecked);
  };

  const handleSelectAll = () => {
    selectOptionHandler(allOptions);
  };

  return (
    <div className="bg-">
      <div className="flex items-center justify-between">
        <div>
          <label className="font-semibold">{label}</label>
        </div>
        <div>
          <Button
            variant="link"
            className="text-blue-900 mt-2"
            onClick={handleSelectAll}
          >
            Select all
          </Button>
        </div>
      </div>
      <List>
        {allOptions.map(
          (option) => (
            <div
              className={`rounded-lg cursor-pointer h-9 my-1 flex items-center  border-zinc-500 ${
                options.indexOf(option) !== -1
                  ? "button-outline border-2"
                  : "border-zinc-500"
              } `}
            >
              <ListItem
                key={option}
                role={undefined}
                dense
                onClick={() => handleToggle(option)}
              >
                <ListItemText
                  primary={<div className="font-semibold capitalize">{option}</div>}
                />
              </ListItem>

              <ListItemIcon className="ml-4">
                <Checkbox
                  edge="end"
                  checked={options.indexOf(option) !== -1}
                  tabIndex={-1}
                  disableRipple
                  icon={<PlusIcon color="#825FFF" />}
                  checkedIcon={<CircleCheckIcon fill="#825FFF" color="white" />}
                />
              </ListItemIcon>
            </div>
          )
        )}
      </List>
    </div>
  );
};

export default FilterButtons;
