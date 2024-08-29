import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Grid,
  TextField,
  IconButton,
  FormControl,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import endpoint from "../../../../api/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Services, StrictModeDroppable } from "../../services/Services";
import GetIcon from "../../../../assets/Icon/icon";
import Buttons from "../../../../components/Button";

const items = [
  { id: "1", title: "Service 1" },
  { id: "2", title: "Service 2" },
  { id: "3", title: "Service 3" },
];

const serviceTagList = [
  { name: "Hair" },
  { name: "Face" },
  { name: "Nails" },
  { name: "Skin" },
];

const schema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup.string().required("Category name is required"),
  serviceTags: yup.string().required("Service tag is required"),
});

export const FormStep4 = ({ setActiveStep }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: "",
      categoryName: "",
      serviceTags: "",
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [primaryService, setPrimaryService] = useState("");
  const [categories, setCategories] = useState([]);
  // State variable to determine if any service array has values
  const [hasServices, setHasServices] = useState(false);
  const [inOboard, setInOboard] = useState<any>(true);
  const [updateCategory, setUpdateCategory] = useState<any>(false);

  const [proceed, setProceed] = useState<any>(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setPrimaryService(service); // Set as primary when selected
    setValue("serviceTags", service); // Update the form value
  };

  const handlePrimarySelect = (service) => {
    setPrimaryService(service);
  };

  const onDragEnd = (result) => {
    // Handle drag end logic here
    console.log(result);
  };

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  const handleDrawerSubmit = async (data) => {
    // Alert with selected service tag and category name
    //alert(`Category Name: ${data.categoryName}\nService Tag: ${data.serviceTags}`);

    const payLoad = {
      id: establishmentId,
      categories: [
        {
          categoryId: "",
          categoryName: data.categoryName,
          serviceTag: data.serviceTags,
          isActive: true,
        },
      ],
    };
    endpoint.saveEstablishmentCategory(payLoad)
    .then(response => {
      if (response?.data?.success){
        // console.log("res",response?.data?.success)
        setUpdateCategory((o)=>!o)
      }
      handleClose();
    })
    .catch(error => {
      console.error("Error saving category:", error); // Handle any errors
    });

  };

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
      if (establishmentData?.data?.success) {
        setCategories([...establishmentData?.data?.data?.categories] || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };

  useEffect(() => {
    getEstablishmentDetails();
  }, []);
  // console.log('categories : ', JSON.stringify(categories))

  useEffect(()=>{
    // Function to check if any service array has values
    const checkForServices = (data) => {
      return data.some(category => category.services.length > 0);
    };

    // Update the state based on the check
    setHasServices(checkForServices(categories));
  },[categories])

  const handleProceed = () => {
    setProceed(true)
    if(hasServices){
      setActiveStep((prevStep) => prevStep + 1);
    }
  }

  return (
    <>
      <section
        className="w-full flex justify-center  flex-1"
        style={{ maxHeight: "82vh", overflowY: "auto" }} 
      >
        <div style={{ width: "60%", padding: "0px 20px", marginTop: 10 }}>
          <h5 className="text-sm mb-2.5 mt-10">Step 3</h5>
          <h4 className="text-xl md:text-4xl tracking-wide mb-3 font-bold">
            What services do you offer?
          </h4>
          <h4 className="text-base md:text-base tracking-wide ml-2">
            Create a category to add services
          </h4>
          {
            (!hasServices && proceed) && (
              <h4 className="text-base md:text-base tracking-wide mb-10 ml-2 text-red-500 text-center">Add atleast one service to proceed</h4>
            )
          }
          <Modal
            open={openModal}
            onClose={handleClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleSubmit(handleDrawerSubmit)}>
              <div
                className="modal-content"
                style={{
                  padding: "20px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              >
                <div className="mb-4">
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#4D4D4D",
                    }}
                  >
                    Category
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      "& .MuiOutlinedInput-root": {
                        marginTop: "10px",
                        borderRadius: "0.6rem",
                      },
                      "& input": {
                        padding: "16.5px 14px",
                      },
                    }}
                    {...register("categoryName")}
                    error={!!errors.categoryName}
                    helperText={errors.categoryName?.message}
                  />
                </div>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#4D4D4D",
                  }}
                >
                  Select Services
                </Typography>
                <Grid container spacing={2}>
                  {serviceTagList?.map((service) => (
                    <Grid item xs={6} key={service.name}>
                      <ServiceCard
                        service={service}
                        onSelect={(name) => {
                          handleServiceSelect(name);
                          handlePrimarySelect(name); // Set as primary when selected
                        }}
                        isPrimary={primaryService === service?.name}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: "none", margin: "10px 10rem" }}
                >
                  Save
                </Button>
              </div>
            </form>
          </Modal>

          <Services inOnboard={inOboard} updateCategory={updateCategory}/>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              onClick={() => handleOpen()}
              style={{
                color: "#825FFF",
                fontSize: "20px",
                fontWeight: 600,
                paddingBottom: 30,
              }}
            >
              Add new category [+]
            </button>
          </div>
        </div>
      </section>
      <footer
        className="w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white"
        style={{ height: "10vh" }}
      >
        <Button
          variant="text"
          size="large"
          color="secondary"
          sx={{ textTransform: "none", fontWeight: "bold", color: '#825FFF', fontSize: '18px' }}
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
        >
          Back
        </Button>

        <Buttons
          sx={{
            borderRadius: "10px",
            padding: "10px 40px 10px 40px",
            textTransform: "none",
            fontSize: "18px",
            fontWeight: 600,
            "@media (max-width: 600px)": {
              padding: "10px 20px 10px 20px",
              fontSize: "14px",
            },
          }}
          variant="contained"
          onClick={handleProceed}
          name={"Proceed"}
        >
          {" "}
        </Buttons>
      </footer>
    </>
  );
};

const ServiceCard = ({ service, onSelect, isPrimary }) => {
  return (
    <Card
      onClick={() => onSelect(service.name)}
      style={{
        cursor: "pointer",
        border: isPrimary ? "2px solid #825FFF" : "1px solid #ccc",
        margin: "10px",
        transition: "0.2s",
        borderRadius: '10px'
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#4D4D4D",
          }}
        >
          {service.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
