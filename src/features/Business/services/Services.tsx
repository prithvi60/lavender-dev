import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
} from "react-beautiful-dnd";
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  TextField,
  styled,
  Box,
  Modal,
  Card,
} from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import GetIcon from "../../../assets/Icon/icon";
import { useDrawer } from "../BusinessDrawerContext";
import { useSelector } from "react-redux";
import endpoint from "../../../api/endpoints";
import AvatarImg from "./AvatarImg";
import AddServicesForm from "./AddServicesForm";
import AddService from "../SalonProfile/Onboarding/AddService";

type Option = "Add services" | "Add category";

interface OptionProps {
  value: Option;
  label: string;
}

const options: OptionProps[] = [
  { value: "Add services", label: "Add services" },
  { value: "Add category", label: "Add category" },
];

interface OptionButtonProps {
  selectedIndex: number;
  handleClick: () => void;
  handleMenuItemClick: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => void;
  handleToggle: () => void;
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  selectedIndex,
  handleClick,
  handleMenuItemClick,
  handleToggle,
  open,
  anchorRef,
}) => (
  <ButtonGroup
    variant="contained"
    ref={anchorRef}
    aria-label="Button group with a nested menu"
    sx={{
      borderRadius: "10px",
      textTransform: "none",
      "@media (max-width: 480px)": { width: "90% !important" },
    }}
  >
    <Button
      style={{
        borderRadius: "10px 0px 0px 10px",
        width: "150px",
        height: "44px",
        textTransform: "none",
        fontSize: "18px",
        fontWeight: 600,
      }}
      sx={{ "@media (max-width: 480px)": { fontSize: "14px !important" } }}
      onClick={handleClick}
    >
      {options[selectedIndex].label}
    </Button>
    <Button
      style={{ height: "44px", borderRadius: "0px 10px 10px 0px" }}
      aria-controls={open ? "split-button-menu" : undefined}
      aria-expanded={open ? "true" : undefined}
      aria-label="select merge strategy"
      aria-haspopup="menu"
      onClick={handleToggle}
    >
      <ArrowDropDownIcon />
    </Button>
    <Popper
      sx={{
        zIndex: 1,
      }}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleToggle}>
              <MenuList id="split-button-menu" autoFocusItem>
                {options.map((option, index) => (
                  <MenuItem
                    sx={{ width: "190px !important" }}
                    key={option.value}
                    disabled={index === 2}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </ButtonGroup>
);

const initialData = {
  components: [] as {
    id: string;
    title: string;
    rows: {
      id: string;
      service: string;
      price: string;
      time: string;
      employees: string[];
    }[];
  }[],
};

const StyledTextField = styled(TextField)({
  // Customize styles here
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    height: "40px",
    width: "388px",
    "@media (max-width: 580px)": { width: "80% !important" },
    "@media (max-width: 480px)": { width: "60% !important" },
    "@media (max-width: 440px)": { width: "50% !important" },
  },
  "& .MuiInputLabel-root": {
    color: "primary.main", // Example: Change label color
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "none", // Example: Change border color
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main", // Example: Border color on hover
  },
});

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export const Services = ({inOnboard}: any) => {
  const [data, setData] = useState(initialData);
  const [orginalData, setOriginalData] = useState(initialData);

  const [serviceInput, setServiceInput] = useState<string | any>("");

  const { openDrawer, isOpen } = useDrawer() || '';

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [categories, setCategories] = React.useState<any[]>([]); // Update type accordingly
  const [employeeData, setEmployeeData] = React.useState<any[]>([]);

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  const handleClick = () => {
    if (options[selectedIndex]?.value === "Add services") {
      openDrawer("addServices");
    } else {
      openDrawer("addCategory");
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const getServices = (service: string) => {
    if (!service) {
      setData(initialData);
      return;
    }
    const Lservice = service.toLowerCase();
    const filteredData = { ...initialData };
    filteredData.components = data.components.map((serviceArr) => {
      serviceArr.rows = serviceArr.rows.filter((row) =>
        row.service.toLowerCase().includes(Lservice)
      );
      return serviceArr;
    });
    setData(filteredData);
  };

  const setCategoryName = (id: string, value: string) => {
    const newData = { ...data };
    newData.components = newData.components.map((category) => {
      if (category.id === id) {
        category.title = value;
      }
      return category;
    });
    setData(newData);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "component") {
      const newComponentOrder = Array.from(data.components);
      const [movedComponent] = newComponentOrder.splice(source.index, 1);
      newComponentOrder.splice(destination.index, 0, movedComponent);

      setData({
        ...data,
        components: newComponentOrder,
      });
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const component = data.components.find(
        (comp) => comp.id === source.droppableId
      );
      const newRows = Array.from(component.rows);
      const [movedRow] = newRows.splice(source.index, 1);
      newRows.splice(destination.index, 0, movedRow);

      const newComponents = data.components.map((comp) => {
        if (comp.id === source.droppableId) {
          return { ...comp, rows: newRows };
        }
        return comp;
      });

      setData({ ...data, components: newComponents });
    } else {
      const sourceComponent = data.components.find(
        (comp) => comp.id === source.droppableId
      );
      const destinationComponent = data.components.find(
        (comp) => comp.id === destination.droppableId
      );

      const sourceRows = Array.from(sourceComponent.rows);
      const destinationRows = Array.from(destinationComponent.rows);

      const [movedRow] = sourceRows.splice(source.index, 1);
      destinationRows.splice(destination.index, 0, movedRow);

      const newComponents = data.components.map((comp) => {
        if (comp.id === source.droppableId) {
          return { ...comp, rows: sourceRows };
        }
        if (comp.id === destination.droppableId) {
          return { ...comp, rows: destinationRows };
        }
        return comp;
      });

      setData({ ...data, components: newComponents });
    }
  };

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(
          establishmentId
        );
        if (establishmentData?.data?.success) {
          setCategories(establishmentData?.data?.data?.categories || []);
          setEmployeeData(establishmentData?.data?.data?.employees || []);
        }
      } catch (error) {
        console.error("Error fetching establishment details:", error);
      }
    };

    getEstablishmentDetails();
  }, [establishmentId, isOpen]);

  const handleDeleteService = async (categoryId: string, serviceId: string) => {
    try {
      const response = await endpoint.deleteEstablishmentService({
        id: establishmentId,
        categories: [
          {
            categoryId: categoryId,
            services: [{ serviceId: serviceId }],
          },
        ],
      });

      if (response.data.success) {
        // Update categories state to reflect the deletion
        const updatedCategories = categories.map((category) => {
          if (category.categoryId === categoryId) {
            // Filter out the deleted service from the category
            category.services = category.services.filter(
              (service) => service.serviceId !== serviceId
            );
          }
          return category;
        });

        // Update state with the new categories array
        setCategories(updatedCategories);

        // Show notification for successful deletion
      } else {
        // Show error notification if deletion was not successful
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      // Show error notification if there was an exception
    }
  };

  useEffect(() => {
    // Transform categories into initialData format
    const transformedCategories = categories?.map((category) => {
      return {
        id: category?.categoryId,
        title: category?.categoryName,
        rows: category?.services?.map((service) => ({
          id: service?.serviceId,
          service: service?.serviceName,
          price: `$${service?.startingPrice}`,
          time: `${service?.options[0]?.duration || 0} min`, // Assuming first option's duration
          employees: service?.employees || [],
        })),
      };
    });

    setData({ components: transformedCategories });
    setOriginalData({ components: transformedCategories });
  }, [categories]);

  const handleEditCategory = (categoryId) => {
    openDrawer("addCategory", categoryId);
  };

  const handleAddCategory = () => {
    if(inOnboard){
      
    }
    else{
      openDrawer("addCategory");
    }
  };

  function handleAddServices(categoryId) {
    console.log("hhiii", inOnboard)
    if(inOnboard){
      setOpenModal(true)
      setCatval(categoryId)
    }
    else{
      openDrawer("addServices", categoryId);
    }
  }

  async function handleDeleteCategory(categoryId) {
    try {
      const response = await endpoint.deleteEstablishmentCategory({
        id: establishmentId,
        categories: [
          {
            categoryId: categoryId,
          },
        ],
      });

      if (response.data.success) {
        // Update categories state to reflect the deletion
        const updatedCategories = categories?.filter(
          (cat) => cat.categoryId !== categoryId
        );

        // Update state with the new categories array
        setCategories(updatedCategories);

        // Show notification for successful deletion
      } else {
        // Show error notification if deletion was not successful
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      // Show error notification if there was an exception
    }
  }

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    //setData(orginalData)
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setData(orginalData);
      return;
    }

    const filteredComponents = orginalData.components
      .map((component) => {
        const filteredRows = component.rows.filter((row) =>
          row.service.toLowerCase().includes(term)
        );
        return { ...component, rows: filteredRows };
      })
      .filter((component) => component.rows.length > 0);

      setData({ components: filteredComponents });
  };
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloses = () => setOpenModal(false);
  const [catval, setCatval] = useState('')
  return (
    <div className= "md:mx-32 mt-8">
      {
        !inOnboard && <><Box
          className="flex md:w-full md:justify-between md:ml-2"
          sx={{
            "@media (max-width: 900px)": {
              display: "flex",
              flexDirection: "column !important",
              alignItems: "center",
            },
          }}
        >
          <StyledTextField
            variant="outlined"
            placeholder=" Search services"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <GetIcon iconName="Search" />,
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              '@media (min-width: 900px)': {
                width: "auto"
              }
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            '@media (min-width: 900px)': {
              marginRight: "4%"
            }
          }}>
            <OptionButton
              selectedIndex={selectedIndex}
              handleClick={handleClick}
              handleMenuItemClick={handleMenuItemClick}
              handleToggle={handleToggle}
              open={open}
              anchorRef={anchorRef}
            />
          </Box>
        </Box>
        </>
      }
   
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable
          droppableId="all-components"
          type="component"
          direction="vertical"
        >
          {(provided) => (
            <div
              className="flex flex-col justify-items-center w-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data?.components?.map((component, index) => (
                <Draggable
                  draggableId={component.id}
                  index={index}
                  key={component.id}
                >
                  {(provided) => (
                    <div
                      className="my-4 px-8 mx-2 md:mx-12 rounded-lg shadow-xl "
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="my-3 font-bold flex justify-between  items-center border-b border-gray-400 h-12"
                        {...provided.dragHandleProps}
                      >
                        <FormControl
                          sx={{
                            m: 1,
                            width: { xs: "25%", md:"20ch" },
                            fontWeight: "700",
                          }}
                          variant="standard"
                        >
                          <div className="flex">
                            <div
                              className="font-bold content-center"
                              style={{
                                textTransform: "none",
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#4D4D4D",
                              }}
                            >
                              {component.title}{" "}
                            </div>

                            <IconButton
                              onClick={() => handleEditCategory(component?.id)}
                            >
                              <GetIcon iconName="EditIcon" />
                            </IconButton>
                          </div>
                        </FormControl>
                        <GetIcon className="mb-3 mr-4" iconName="DragIcon" />
                        <Button
                          className="flex justify-between items-center font-bold mr-5"
                          onClick={() => handleDeleteCategory(component.id)}
                        >
                          <GetIcon iconName="DeleteIcon" />
                          <span
                            style={{
                              textTransform: "none",
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "#4D4D4D",
                            }}
                            className="hidden md:block"
                          >
                            Delete category
                          </span>
                        </Button>
                      </div>
                      <StrictModeDroppable
                        droppableId={component.id}
                        type="row"
                      >
                        {(provided) => (
                          <div
                            className=""
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {component.rows.map((row, index) => (
                              <Draggable
                                draggableId={row.id}
                                index={index}
                                key={row.id}
                              >
                                {(provided) => (
                                  <div
                                    className="flex align-middle justify-between p-2 border-b border-gray-400 h-12 bg-white last:border-b-0"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      className="flex w-1/4"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#4D4D4D",
                                      }}
                                    >
                                      <GetIcon
                                        {...provided.dragHandleProps}
                                        className="mr-4"
                                        iconName="DragIcon"
                                      />
                                      {row.service}
                                    </div>
                                    <div
                                      className="w-1/4"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#4D4D4D",
                                      }}
                                    >
                                      {row.time}
                                    </div>
                                    <div
                                      className="w-1/4"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "#4D4D4D",
                                      }}
                                    >
                                      {row.price}
                                    </div>
                                    <div className="flex items-center justify-end w-1/4">
                                      <div className="flex">
                                        {row?.employees?.map(
                                          (employee, index) => (
                                            // <GetIcon key={index} iconName='ProfileIcon' className='m-1'/>
                                            <AvatarImg
                                              row={employee}
                                              employeeData={employeeData}
                                            />
                                          )
                                        )}
                                      </div>
                                      <div className="ml-2 cursor-pointer">
                                        <GetIcon
                                          onClick={() =>
                                            handleDeleteService(
                                              component.id,
                                              row.id
                                            )
                                          }
                                          iconName="DeleteIcon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="h-12 font-bold flex items-center justify-center bottom-0">
                              <button
                                onClick={() => handleAddServices(component.id)}
                                style={{
                                  textTransform: "none",
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#4D4D4D",
                                }}
                              >
                                Add new service [+]
                              </button>
                            </div>
                          </div>
                        )}
                      </StrictModeDroppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {
                  !inOnboard && <button
                    onClick={() => handleAddCategory()}
                    style={{
                      color: "#825FFF",
                      fontSize: "20px",
                      fontWeight: 600,
                      paddingBottom: 30,
                    }}
                  >
                    Add new category [+]
                  </button>
                }
                
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>



      <Modal
        open={openModal}
        onClose={handleCloses}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <Card >
            <AddService payload={catval}/>
          </Card>
        </Modal>
    </div>
  );
};
