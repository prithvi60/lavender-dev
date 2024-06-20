import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  FormHelperText,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import editIcon from "../../../assets/editbtn.svg";
import { Button } from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import endpoint from "../../../api/endpoints";
import { categories } from "../../../constants/constants";


const schema = yup.object().shape({
  categoryName: yup.string().required(),
  serviceTags: yup.string(),
});

const categoriesApiResponseSample = {
  'categoryId' : 'CAT00002503',
  'categoryName': 'hair wash',
  'serviceTags': 'Hair coloring'
}

const serviceTagList = [
    { name: "Hair styling", value: "Hair styling" },
    { name: "Nail", value: "Nail" },
    { name: "Skin", value: "Skin" },
    { name: "Hair coloring", value: "Hair coloring" },
    { name: "Face", value: "Face" },

  ];

export default function AddCategoryForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: categoriesApiResponseSample.categoryName,
      serviceTags: categoriesApiResponseSample.serviceTags,
    },
  });


  const [addOptions, setAddOptions] = useState(false);

  const { closeDrawer } = useDrawer();

  const handleDrawerSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    const payLoad = {
      "id": "EST00002500",
      "categories": [
        {
          "categoryId":"",
          "categoryName": data.categoryName,
          "serviceTag": data.serviceTags,
          "isActive": true
        }
      ]
    }
    debugger
    const response = endpoint.saveEstablishmentCategory(payLoad);
  };

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleDrawerSubmit)}>
        <div style={{backgroundColor: '#1B1464'}}>
            <div className="text-lg h-14 mb-2 p-4 text-white">
                Add new Category
            </div>
        </div>
        
        <div className="flex-col h-full p-4">
          <div className="mb-4">
            <Typography
              
              sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
            >
              Category name
            </Typography>
            <TextField fullWidth size="small" variant="outlined" {...register("categoryName")} />
            {errors.categoryName && (
              <p className="text-red-500 font-medium">{errors.categoryName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Controller
              name="serviceTags"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.serviceTags} fullWidth>
                  <Typography
                    
                    sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                  >
                    Service tags
                  </Typography>
                  <Select
                    {...field}
                    label="serviceTags"
                    error={!!errors.serviceTags}
                    fullWidth
                  >
                    {serviceTagList.map((emp) => (
                      <MenuItem key={emp.value} value={emp.value}>
                        {emp.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.serviceTags?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>


          <div className="flex justify-between mt-4">
            <Button
              onClick={closeDrawer}
              variant="ghost"
              style={{ color: "#825FFF" }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
        
      </form>
    </div>
  );
}
