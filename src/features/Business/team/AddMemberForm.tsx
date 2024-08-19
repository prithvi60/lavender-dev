import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Typography,
  Button,
  Divider,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Collapse,
  List,
  ListItem,
  Select,
  MenuItem,
  Avatar,
  Badge,
  Card,
  CardContent,
  Grid,
  FormHelperText
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useDrawer } from "../BusinessDrawerContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import endpoint from "../../../api/endpoints";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GetIcon from "../../../assets/Icon/icon";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../components/Snackbar";
import ImageUploading from 'react-images-uploading';
import Text from "../../../components/Text";
interface ImageUploadResponse {
  data: {
    success: boolean;
    data: string;
  };
}

const schema = yup.object().shape({
  employeeId: yup.string(),
  employeeName: yup.string().required("Employee name is required"),
  startingDate: yup.mixed().required('Starting date is required').test(
    'is-dayjs',
    'Invalid date format',
    (value) => dayjs.isDayjs(value)
  ),
  email: yup.string().required(),
  accessLevel: yup.string(),
  services: yup.array().of(
    yup.object().shape({
      categoryId: yup.string().required(), // Ensure categoryId is required
      categoryName: yup.string().required(), // Ensure categoryName is required
      services: yup.array().of(
        yup.object().shape({
          serviceId: yup.string().required(), // Ensure serviceID is required
          serviceName: yup.string().required() // Ensure serviceName is required
        })
      ).required() // Ensure services array is required
    })
  ),
  profileImage: yup.string(),
});


const AquaCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: '#35AFAC',
  },
}));


export default function AddMemberForm({ payload }) {
  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
      startingDate: null,
      email: '',
      accessLevel: '',
      profileImage: '',
      services: [],
    },

  });

  const employeeId: any = payload
  const { closeDrawer } = useDrawer();

  const [values, setValues] = React.useState<null | any>(null);
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState<any>([]);

  const [images, setImages] = useState([]);
  const [photosId, setPhotoId] = useState([]);
  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const maxNumber = 69;
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [open, setOpen] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formattedData, setFormattedData] = useState([]);

  const showSnackbar = useSnackbar();

  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  const handleDrawerSubmit = async (data) => {


    const selectedData = formattedData
      .filter(category => category?.services?.some(service => service?.isSelected)) // Filter categories with selected services
      .map(category => ({
        categoryId: category?.categoryId, // Ensure this field matches your data structure
        categoryName: category?.categoryName,
        services: category?.services
          .filter(service => service?.isSelected) // Keep only selected services
          .map(service => ({
            serviceId: service?.serviceId, // Ensure this field matches your data structure
            serviceName: service?.serviceName
          }))
      }));

    const payLoad = {
      "id": establishmentId,
      "employees": [
        {
          "employeeId": employeeId ? employeeId : "",
          "employeeName": data?.employeeName,
          "email": data?.email,
          "startingDate": data?.startingDate ? data.startingDate.format('MM/DD/YYYY') : null,
          "profileImage": imageIdList?.length > 0 ? imageIdList[0] : (data?.profileImage ? data?.profileImage : ''),
          "services": selectedData,
          "accessLevel": data?.accessLevel,
        },
      ],
    }

    const response = await endpoint.saveEstablishmentEmployee(payLoad);

    closeDrawer();
  };

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
      if (establishmentData?.data?.success) {
        setEmployee(establishmentData?.data?.data?.employees || []);
        setCategories(establishmentData?.data?.data?.categories || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };


  useEffect(() => {
    getEstablishmentDetails();
  }, []);

  useEffect(() => {

    if (employeeId) {

      setCurrentEmployees(employee?.filter(cat => cat?.employeeId === employeeId));
    }
  }, [employee, employeeId])

  const fetchingImage = async () => {
    try {
      if (currentEmployees[0]?.profileImage) {
        const res = await fetchImage(currentEmployees[0]?.profileImage)
        setImageUrls([res])
        setLoading(false);
      }
    }
    catch {
    }
  }
  useEffect(() => {

    fetchingImage();

    if (currentEmployees) {
      // const formattedData = currentEmployees?.map(category => ({
      //   categoryId: category.categoryId, // Ensure categoryId is present
      //   categoryName: category.categoryName, // Ensure categoryName is present
      //   services: category.services.map(service => ({
      //     serviceID: service.serviceId, // Ensure serviceID is present
      //     serviceName: service.serviceName // Ensure serviceName is present
      //   }))
      // }));

      setValue('employeeId', currentEmployees[0]?.employeeId);
      setValue('employeeName', currentEmployees[0]?.employeeName);
      setValue('email', currentEmployees[0]?.email);
      const startingDate: any = currentEmployees[0]?.startingDate ? new Date(currentEmployees[0]?.startingDate) : null;
      setValue('startingDate', dayjs(startingDate));
      setValues(dayjs(startingDate))
      setValue('profileImage', currentEmployees[0]?.profileImage);
      setValue('accessLevel', currentEmployees[0]?.accessLevel);
      //setValue('services', formattedData);
    }
  }, [currentEmployees]);

  useEffect(() => {
    const transformedData = categories.map(category => ({
      ...category,
      isOpen: false,
      isSelected: false,
      services: category.services.map(service => ({
        ...service,
        isSelected: false
      }))
    }));
    setFormattedData(transformedData);
  }, [categories]);

  const handleCategoryClick = (index) => {
    setOpen(prevOpen => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const handleCategoryChange = (index, checked) => {
    const newData = [...formattedData];
    newData[index].isSelected = checked;
    newData[index].services.forEach(service => {
      service.isSelected = checked;
    });
    setFormattedData(newData);
    setValue('services', newData);
  };

  const handleServiceChange = (categoryIndex, serviceIndex, checked) => {
    const newData = [...formattedData];
    newData[categoryIndex].services[serviceIndex].isSelected = checked;
    setFormattedData(newData);
    setValue('services', newData);
  };

  const handleSelectAllChange = (checked) => {
    const newData = formattedData.map(category => ({
      ...category,
      isSelected: checked,
      services: category.services.map(service => ({
        ...service,
        isSelected: checked
      }))
    }));
    setFormattedData(newData);
    setSelectAll(checked);
    setValue('services', newData);
  };


  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of photosId) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    }
    if (photosId.length > 0) {
      callFetchImageApi();
    }
  }, [photosId])

  const fetchImage = async (image) => {

    try {
      setLoading(true);
      const response = await endpoint.getImages(image, establishmentId);

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const onChange = (imageList) => {
    setImages(imageList);
    setIsImageUploaded(true);
  };

  useEffect(() => {
    if (images.length > 0) {
      saveImages();
    }
  }, [images]);

  const saveImages = async () => {
    try {
      const payload = new FormData();
      images.forEach((image) => {
        payload.append('file', image.file);
      });
      const res = mutation.mutate(payload);
      setImages([]);
    }
    catch {

    }
  };

  const handleDragEnd = () => {
    // handle drag end logic if needed
  };

  const mutation = useMutation<ImageUploadResponse, Error, FormData>({
    mutationFn: async (payload) => {
      const response = await endpoint.saveEstablishmentPhotos(payload, establishmentId);
      if (response?.data?.success) {
        const updatedImageIdList = [response?.data?.data];
        setImageIdList(updatedImageIdList)
      }
      return response;
    },
    onSuccess: (response) => {
      // if(response?.data?.success){
      //   showSnackbar('Items saved successfully.', 'success');
      // }
      // else{
      //   showSnackbar(response?.data?.data, 'error');
      // }
    },
    onError: (error) => {
      console.error('Upload Error:', error);
      alert('Upload Error');
    },
    onSettled: () => {
    },
  });

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      //callSaveImageIdApi(imageIdList);
      setImageUrls(urls);
      setLoading(false);
      setIsImageUploaded(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleDrawerSubmit)}>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#1B1464] text-xl h-14 mb-2 px-4 py-3 text-white font-bold" style={{ zIndex: 2 }}>
          {payload ? "Edit new Member" : "Add new Member"}
        </div>

        <div className="flex-col h-full p-4 overflow-y-auto">

          <div className="mb-4 flex justify-center flex-col items-center">
            <ImageUploading
              multiple
              value={images}

              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
              acceptType={['jpg', 'png', 'jpeg']} // Include jpeg in acceptType
            >
              {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                <div className='flex justify-center'>

                  <div style={{ padding: '10px' }}>

                    {imageUrls.length > 0 ? (
                      <>
                        {imageUrls?.map((url, index) => (
                          <>
                            <Badge
                              sx={{ cursor: 'pointer', }}
                              onClick={onImageUpload}
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              badgeContent={
                                <GetIcon iconName='EditWhiteIcon' style={{ width: '32px', height: '32px', borderRadius: '20px', backgroundColor: '#FF83B0', display: 'flex', justifyContent: 'center', alignItem: 'center' }} />
                              }
                            >
                              <Avatar key={index} src={url} alt={`Image ${index}`} style={{ backgroundColor: '#1B1464', width: '90px', height: '90px' }}
                                {...dragProps} />
                            </Badge>
                          </>

                        ))}
                      </>
                    ) : (
                      <>

                        {/* <GetIcon iconName='EditIcon' style={{borderRadius: '20px', backgroundColor: '#FF83B0'}}/> */}
                        <Badge
                          sx={{ cursor: 'pointer' }}
                          onClick={onImageUpload}
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <GetIcon iconName='EditWhiteIcon' style={{ width: '32px', height: '32px', borderRadius: '20px', backgroundColor: '#FF83B0', display: 'flex', justifyContent: 'center', alignItem: 'center' }} />
                          }
                        >
                          <Avatar src={''} style={{ backgroundColor: '#1B1464', width: '90px', height: '90px' }}
                            {...dragProps}></Avatar>

                        </Badge>
                        {/* </Avatar> */}

                      </>

                    )}
                  </div>
                </div>
              )}
            </ImageUploading>

            {
              (isImageUploaded && !loading) &&
              <div className='flex flex-col justify-center items-center '>
                <Text name={"Photo is uploaded. Please save it."} sx={{ p: 1 }} />

                <Button
                  onClick={handleButtonClick}
                  sx={{}}
                >Save</Button>
              </div>
            }

            <div>
              <br />
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div> */}
            </div>
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Employee name
            </Typography>
            <TextField
              sx={styles.textField}
              defaultValue={''}
              fullWidth
              size="small"
              variant="outlined"
              {...register("employeeName")}
              error={!!errors.employeeName}
              helperText={errors.employeeName?.message}
            />
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Email ID
            </Typography>
            <TextField
              sx={styles.textField}
              fullWidth
              size="small"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div className="mb-4">
            <Grid container spacing={1} sx={{ alignContent: "end" }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Access Level
              </Typography>
              <Controller
                name="accessLevel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.accessLevel} fullWidth>
                    <Select {...field} error={!!errors.accessLevel} fullWidth sx={styles.select}>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                    <FormHelperText>{errors.accessLevel?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Starting Date
            </Typography>
            <Controller
              name="startingDate"
              control={control}
              defaultValue={dayjs(new Date())}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={styles.textField} {...field} value={values} onChange={(date) => field.onChange(date)} />
                </LocalizationProvider>
              )}
            />
            {errors.startingDate && (
              <Typography variant="caption" color="error" gutterBottom>
                {errors.startingDate.message}
              </Typography>
            )}
          </div>

          <div className="mb-4">
            <Divider sx={{ borderColor: 'black' }} />
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
              Services
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <AquaCheckbox
                    checked={selectAll}
                    onChange={e => handleSelectAllChange(e.target.checked)}
                  />
                }
                label="Select All"
              />
              {formattedData.map((category, categoryIndex) => (
                <FormControl key={category.categoryId} component="fieldset">
                  <ListItem button onClick={() => handleCategoryClick(categoryIndex)}>
                    <FormControlLabel
                      control={
                        <AquaCheckbox
                          checked={category.isSelected}
                          indeterminate={
                            category.services.some(service => service.isSelected) &&
                            !category.services.every(service => service.isSelected)
                          }
                          onChange={e => handleCategoryChange(categoryIndex, e.target.checked)}
                        />
                      }
                      label={category.categoryName}
                    />
                    {open[categoryIndex] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open[categoryIndex]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {category.services.map((service, serviceIndex) => (
                        <ListItem button key={service.serviceId} sx={{ pl: 4 }}>
                          <FormControlLabel
                            control={
                              <AquaCheckbox
                                checked={service.isSelected}
                                onChange={e => handleServiceChange(categoryIndex, serviceIndex, e.target.checked)}
                              />
                            }
                            label={service.serviceName}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </FormControl>
              ))}
            </FormGroup>
          </div>

        </div>

        <div className="sticky bottom-0 bg-white flex justify-between mt-4 p-4 border-t">
          <Button onClick={closeDrawer} sx={styles.txtBtn}>
            Cancel
          </Button>
          <Button type="submit" sx={styles.btn}>Add</Button>
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