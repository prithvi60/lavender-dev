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
  { name: "Hairdresser" },
  { name: "Barber" },
  { name: "Nails" },
  { name: "Aesthetics" },
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

  const [inOboard, setInOboard]= useState<any>(true);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // handleClose();
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
    const payLoad = {
      id: establishmentId,
      categories: [
        {
          categoryId:
            //  categoryId ? categoryId :
            "",
          categoryName: data.categoryName,
          serviceTag: data.serviceTags,
          isActive: true,
        },
      ],
    };

    endpoint
      .saveEstablishmentCategory(payLoad)
      .then((response) => {
        getEstablishmentDetails(); // Call this after the save operation
        handleClose();
      })
      .catch((error) => {
        console.error("Error saving category:", error); // Handle any errors
      });
  };

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        establishmentId
      );
      if (establishmentData?.data?.success) {
        // setCategories([...establishmentData?.data?.data?.categories] || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };

  useEffect(() => {
    getEstablishmentDetails();
  }, []);

  return (
    <>
      <section
        className="w-full flex justify-center items-center flex-1 overflow-y-auto"
        style={{ height: "80vh" }}
      >
        <div style={{ width: "60%", padding: "0px 20px", marginTop: 10}}>
          <h5 className="text-sm mb-2.5 mt-10">Step 3</h5>
          <h4 className="tetx-xl md:text-3xl tracking-wide mb-10">
            Add services
          </h4>
          {/* 
        <Button variant="text" onClick={handleOpen}>
          Add Category
        </Button> */}
          {/* <p>Selected Service: {selectedService}</p>/ */}
          {/* <p>Primary Service: {primaryService}</p> */}
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
                    // {...register("category")}
                    // error={!!errors.category}
                    // helperText={errors.category?.message}
                  />
                </div>
                <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#4D4D4D",
                    }}
                  >Select Services</Typography>
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
                  sx={{ textTransform: "none",margin:"10px 10rem" }}
                >
                  Save
                </Button>
              </div>
            </form>
          </Modal>

          <>
            <Services inOnboard={inOboard}/>
          </>
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
          onClick={() => {
            setActiveStep((prevStep) => prevStep + 1);
          }}
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
        border: isPrimary ? "1px solid #825FFF" : "1px solid #ccc",
        margin: "10px",
        transition: "0.3s",
      }}
    >
      <CardContent>
        <Typography
           sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#4D4D4D",
          }}
        >{service.name}</Typography>
      </CardContent>
    </Card>
  );
};
