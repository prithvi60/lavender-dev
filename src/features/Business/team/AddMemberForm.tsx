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
  CardContent
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
import endpoint from "../../../api/endpoints";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GetIcon from "../../../assets/Icon/icon";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../components/Snackbar";
import ImageUploading from 'react-images-uploading';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
  startingDate: yup.date().nullable().required("Starting date is required"),
  email: yup.string().required(),
  services: yup.array().of(
    yup.object().shape({
      serviceName: yup.string(),
      optionName: yup.array().of(yup.string()),
    })
  ),
  profileImage: yup.string(),
});


// const services = [
//   {
//     serviceName: 'test face coloring',
//     optionName: ['Test1', 'trst2', 'test3'],
//   },
//   {
//     serviceName: 'test service',
//     optionName: ['Test1', 'trst2'],
//   },
//   {
//     serviceName: 'test service 2',
//     optionName: [],
//   },
// ];

export default function AddMemberForm({ payload }) {
  
  console.log("payload L ", payload)

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
      startingDate: new Date(),
      email: '',
      profileImage: '',
      services: [],
    },
  });
  const employeeId: any = payload
  const { closeDrawer } = useDrawer();
  
  const [value, setValues] = React.useState<Dayjs | null | any>(null);
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

  const showSnackbar = useSnackbar();

  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  const handleDrawerSubmit = async (data) => {
    
const selectedData = data?.services?.filter(service => service?.optionName?.length > 0);
console.log(selectedData);
    const payLoad = {
        "id": establishmentId,
        "employees": [
            {
             "employeeId": employeeId ? employeeId : "",
              "employeeName": data.employeeName,
              "email": data?.email,
              "startingDate": data.startingDate ? data.startingDate?.toLocaleDateString('en-GB') : null,
              "profileImage": imageIdList.length > 0 && imageIdList[0],
              "services": selectedData,
            },
          ],
    }

    const response = await endpoint.saveEstablishmentEmployee(payLoad);
    // if(response?.data?.success){
    //   
    //   const res = endpoint.getEstablishmentDetailsById(establishmentId);

    // }
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

  useEffect(()=>{
    const filteredServices = categories?.flatMap(category =>
      category?.services?.map(service => ({
        serviceId: service?.serviceId,
        serviceName: service?.serviceName,
        optionName: service?.options?.map(option => option?.optionName)
      }))
    );
    console.log("filteredServices : ", filteredServices)
    setServices(filteredServices);
  },[categories])

  useEffect(() => {
    getEstablishmentDetails();
  }, []);

  useEffect(()=>{
    
    if(employeeId){
      
      setCurrentEmployees(employee?.filter(cat => cat?.employeeId === employeeId));
    }
  },[employee, employeeId])

  useEffect(() => {

    const fetchingImage = async () => {
      try{
        console.log("currentEmployees[0]?.profileImage : ", currentEmployees[0]?.profileImage)
        if(currentEmployees[0]?.profileImage){
          const res = await fetchImage(currentEmployees[0]?.profileImage)
          console.log('res ; ', res)
          setImageUrls([res])
          setLoading(false);
        }
      }
      catch{
      }
    }
    fetchingImage();
    
    console.log("imageUrls[0] : ", imageUrls)
    if (currentEmployees) {
      
      setValue('employeeId', currentEmployees[0]?.employeeId);
      setValue('employeeName', currentEmployees[0]?.employeeName);
      setValue('email', currentEmployees[0]?.email);
      const startingDate: any = currentEmployees[0]?.startingDate ? new Date(currentEmployees[0]?.startingDate) : null;
      setValue('startingDate', startingDate);
      setValue('profileImage', imageUrls[0]);
    }   
  }, [currentEmployees]);


  const [open, setOpen] = React.useState(
    services.map(() => false)
  );

  const handleClick = index => {
    setOpen(prevOpen => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  // const onSubmit = data => {
  //   const selectedData = data.services.filter(service => service.optionName.length > 0);
  //   console.log(selectedData);
  // };

  const handleParentChange = (index, checked) => {
    const newOptions = checked ? services[index].optionName : [];
    setValue(`services.${index}.optionName`, newOptions);
  };

  const handleSelectAllChange = checked => {
    const newServices = services.map(service => ({
      serviceName: service.serviceName,
      optionName: checked ? service.optionName : [],
    }));
    setValue('services', newServices);
  };

  const allSelected = services.length > 0 && watch('services')?.every(
    service => service?.optionName?.length > 0
  );

  // useEffect(()=>{
  //   const getEstablishmentDetails = async () => {
  //     const establishmentData  = await endpoint.getEstablishmentDetailsById(establishmentId);
  //     if(establishmentData?.data?.success){
  //       setPhotoId(establishmentData?.data?.data?.estImages)
  //       setImageIdList(establishmentData?.data?.data?.estImages)
  //     }
  //   }

  //   getEstablishmentDetails();
    
  // }, [])

  useEffect( () =>{
    const callFetchImageApi = async () =>{
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

  const onChange =  (imageList) => {
    setImages(imageList);
    setIsImageUploaded(true);
  };

  useEffect(() => {
    if (images.length > 0) {
      saveImages();
    }
  }, [images]); 

  const saveImages = async () => {
    try{
      const payload = new FormData();
      images.forEach((image) => {
        payload.append('file', image.file);
      });
      const res = mutation.mutate(payload);
      setImages([]);
    }
    catch{

    }
  };

  const handleDragEnd = () => {
    // handle drag end logic if needed
  };

  const mutation = useMutation<ImageUploadResponse, Error, FormData>({
    mutationFn: async (payload) => {
      const response =  await endpoint.saveEstablishmentPhotos(payload, establishmentId);
      if(response?.data?.success){
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
      callSaveImageIdApi(imageIdList);
      setImageUrls(urls);
      setLoading(false);
      setIsImageUploaded(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const callSaveImageIdApi = async(imageId) =>{
    
    const payload = {
      "id": establishmentId,
      "estImages": imageId,
    }
   const response = await endpoint.saveImageId(payload);
    if(response?.data?.success){
      showSnackbar('Image Uploaded.', 'success');
    }
    else{
      showSnackbar(response?.data?.data, 'error');
    }
  }

  console.log("categories : ", categories)
  
  console.log("services : ", services)
  


  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleDrawerSubmit)}>
        <div style={{ backgroundColor: '#1B1464' }}>
          <div className="text-lg h-14 mb-2 p-4 text-white">
            {payload ? "Edit new Member" : "Add new Member"}

          </div>
        </div>

        <div className="flex-col h-full p-4">

          <div className="mb-4 flex justify-center flex-col items-center">
          <DragDropContext onDragEnd={handleDragEnd}>
            <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey='data_url'
            acceptType={['jpg', 'png', 'jpeg']} // Include jpeg in acceptType
          >
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
              <div className='flex justify-center '>
                {/* <Droppable droppableId='droppable'>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-wrap justify-center'>
                      {imageList.map((image, index) => (
                        <Draggable key={index} draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className='image-item'
                              style={{ padding: '10px' }}
                            >
                              <Card style={{ width: '200px', height: '200px' }}>
                                <img src={image.data_url} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </Card>
                              
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable> */}
                <div style={{ padding: '10px' }}>

                  {imageUrls.length > 0 ? (
                    <>
                      {imageUrls?.map((url, index) => (
                              // <img key={index} src={url} alt={`Image ${index}`} style={{ width: '200px', margin: '10px' }} />
                                    <Avatar key={index} src={url} alt={`Image ${index}`} style={{ backgroundColor: '#1B1464', width: '90px', height: '90px' }} onClick={onImageUpload}
                                        {...dragProps}>
                                        {/* <GetIcon iconName='EditIcon' style={{borderRadius: '20px', backgroundColor: '#FF83B0'}}/> */}
                                        <Badge
                                          overlap="circular"
                                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                          badgeContent={
                                            <GetIcon iconName='EditWhiteIcon' style={{width: '32px', height: '32px', borderRadius: '20px', backgroundColor: '#FF83B0', display: 'flex', justifyContent: 'center', alignItem: 'center'}}/>
                                          }
                                        ></Badge>
                                      </Avatar>
                      ))}
                    </>
                  ) : (
                      <Avatar src={''} style={{ backgroundColor: '#1B1464', width: '90px', height: '90px' }} onClick={onImageUpload}
                        {...dragProps}>
                        {/* <GetIcon iconName='EditIcon' style={{borderRadius: '20px', backgroundColor: '#FF83B0'}}/> */}
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <GetIcon iconName='EditWhiteIcon' style={{width: '32px', height: '32px', borderRadius: '20px', backgroundColor: '#FF83B0', display: 'flex', justifyContent: 'center', alignItem: 'center'}}/>
                          }
                        ></Badge>
                      </Avatar>
                  )}
                
                </div>
              </div>
            )}
            </ImageUploading>
          </DragDropContext>

{
        (isImageUploaded && !loading) && 
        <div className='flex flex-col justify-center items-center '>
          <Text name={"Photo is uploaded. Please save it."} sx={{p: 1}}/>
        
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
              fullWidth
              size="small"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
            Access level
            </Typography>

            <Select
                    error={!!errors.email}
                    fullWidth
                  >
                    
                      <MenuItem >
                        Admin
                      </MenuItem>
                      <MenuItem >
                        Employee
                      </MenuItem>
                    
                  </Select>
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Starting Date
            </Typography>
            <Controller
              name="startingDate"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker {...field} value={value} onChange={(date) => field.onChange(date)} sx={{ width: '100%' }} />
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
            <Divider sx={{borderColor: 'black'}}/>
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Services
            </Typography>
            
            {errors.startingDate && (
              <Typography variant="caption" color="error" gutterBottom>
                {errors.startingDate.message}
              </Typography>
            )}
          </div>

          <div className="mb-4">
            <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={allSelected}
                onChange={e => handleSelectAllChange(e.target.checked)}
              />
            }
            label="Select All"
          />
          {services.map((service, index) => (
            <FormControl key={service?.serviceName} component="fieldset">
              <ListItem button onClick={() => handleClick(index)}>
                <FormControlLabel
                  control={
                    <Controller
                      name={`services.${index}.optionName`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={
                            field?.value?.length === service?.optionName?.length &&
                            service?.optionName?.length > 0
                          }
                          indeterminate={
                            field?.value?.length > 0 &&
                            field?.value?.length < service?.optionName?.length
                          }
                          onChange={e =>
                            handleParentChange(index, e.target.checked)
                          }
                        />
                      )}
                    />
                  }
                  label={service?.serviceName}
                />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {service.optionName.map(option => (
                    <ListItem key={option} sx={{ pl: 4 }}>
                      <FormControlLabel
                        control={
                          <Controller
                            name={`services.${index}.optionName`}
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={field?.value?.includes(option)}
                                onChange={e => {
                                  const newValue = e?.target?.checked
                                    ? [...field?.value, option]
                                    : field?.value?.filter(val => val !== option);
                                  field.onChange(newValue);
                                }}
                              />
                            )}
                          />
                        }
                        label={option}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </FormControl>
          ))}
            </FormGroup>
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={closeDrawer} sx={styles.txt}>
              Cancel
            </Button>
            <Button type="submit" sx={styles.btn}>Add</Button>
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
  txt: {
    color: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none',
  }
}