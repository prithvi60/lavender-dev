import React, { useEffect, useState } from "react";
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
  Button
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
// import { Button } from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import endpoint from "../../../api/endpoints";
import { categories } from "../../../constants/constants";
import { useSelector } from "react-redux";


const schema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup.string().required("Category name is required"),
  serviceTags: yup.string().required("Service tag is required"),
});

// const categoriesApiResponseSample = {
//   'categoryId' : 'CAT00002503',
//   'categoryName': 'hair wash',
//   'serviceTags': 'Hair coloring'
// }

const serviceTagList = [
    { name: "Hair styling", value: "Hair styling" },
    { name: "Nail", value: "Nail" },
    { name: "Skin", value: "Skin" },
    { name: "Hair coloring", value: "Hair coloring" },
    { name: "Face", value: "Face" },

  ];

export default function AddCategoryForm({payload}) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: '',
      categoryName: '',
      serviceTags: '',
    },
  });

  
  const categoryId: string = payload;

  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [response, setResponse] = useState([]);


  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  const [addOptions, setAddOptions] = useState(false);

  const { closeDrawer } = useDrawer();

  const handleDrawerSubmit = (data) => {
    const payLoad = {
      "id": establishmentId,
      "categories": [
        {
          "categoryId": categoryId ? categoryId : "",
          "categoryName": data.categoryName,
          "serviceTag": data.serviceTags,
          "isActive": true
        }
      ]
    }
    const response = endpoint.saveEstablishmentCategory(payLoad);
    closeDrawer();
    
    getEstablishmentDetails();
  };

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
      if (establishmentData?.data?.success) {
        setCategories(establishmentData?.data?.data?.categories || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };

  useEffect(() => {
    getEstablishmentDetails();
  }, []);

  useEffect(()=>{
    if(categoryId){
      
      setCurrentCategories(categories?.filter(cat => cat.categoryId === categoryId));
    }
  },[categories])

  useEffect(() => {
    if (currentCategories) {
      setValue('categoryId', currentCategories[0]?.categoryId);
      setValue('categoryName', currentCategories[0]?.categoryName);
      setValue('serviceTags', currentCategories[0]?.serviceTag);
    }
  }, [currentCategories, setValue]);
  
  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleDrawerSubmit)}>
        <div style={{backgroundColor: '#1B1464'}}>
          {
            categoryId 
            ?  
            <div className="text-xl h-14 mb-2 p-4 text-white font-bold">
                Edit new Category
            </div> 
            : 
            <div className="text-xl h-14 mb-2 p-4 text-white font-bold">
                Add new Category
            </div> 
          }
            
        </div>
        
        <div className="flex-col h-full p-4">
          <div className="mb-4">
            <Typography
              
              sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
            >
              Category name
            </Typography>
            {/* {
              categoryId 
              ?
              <TextField sx={styles.textField} fullWidth defaultValue="" size="small" variant="outlined" {...register("categoryName")} />
              :
              <TextField sx={styles.textField} fullWidth defaultValue="tst"  size="small" variant="outlined" {...register("categoryName")} />

            }
            {errors.categoryName && (
              <p className="text-red-500 font-medium">{errors.categoryName.message}</p>
            )} */}

              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.categoryName} fullWidth>
                    <TextField
                      {...field}
                      size="small"
                      variant="outlined"
                      error={!!errors.categoryName}
                      fullWidth
                      sx={styles.textField}
                    />
                    <FormHelperText>{errors.categoryName?.message}</FormHelperText>
                  </FormControl>
                  )}
              />
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
                    error={!!errors.serviceTags}
                    fullWidth
                    sx={styles.select}
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
              sx={styles.txtBtn}
            >
              Cancel
            </Button>
            <Button type="submit" sx={styles.btn}>Save</Button>
          </div>
        </div>
        
      </form>
    </div>
  );
}

const styles = {
  btn: {
    color: '#FFFFFF',
    backgroundColor: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    padding: '10px 40px 10px 40px',
    borderRadius: '10px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#5A3EBF',
    }
  },
  txtBtn: {
    color: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none',
  },
  textField: {
    width: '272px',
    '& .MuiInputBase-root': {
      height: '55px', // Apply height to the input root
      borderRadius: '9px',
    },
    
  },
  select: {
    '& .MuiInputBase-root': {
      width: '272px !important',
      height: '55px',
      borderRadius: '9px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '9px',
    },
  },
}