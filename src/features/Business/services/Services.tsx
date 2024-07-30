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
  Input,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import GetIcon from "../../../assets/Icon/icon";
import { SearchInput } from "../Appointments/AppointmentControllers";
import { useDrawer } from "../BusinessDrawerContext";
import { useSelector } from "react-redux";
import endpoint from "../../../api/endpoints";
import { category } from "../../../api/constants";

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
  <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
    <Button style={{ borderRadius: '5px 0px 0px 5px' }} onClick={handleClick}>
      {options[selectedIndex].label}
    </Button>
    <Button
      style={{ height: '40px', borderRadius: '0px 5px 5px 0px' }}
      aria-controls={open ? 'split-button-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
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
            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleToggle}>
              <MenuList id="split-button-menu" autoFocusItem>
                {options.map((option, index) => (
                  <MenuItem
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

export const Services: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filteredService, setFilteredService] = useState(initialData);

  const [serviceInput, setServiceInput] = useState<string | any>('');

  const { openDrawer, isOpen } = useDrawer();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [categories, setCategories] = React.useState<any[]>([]); // Update type accordingly

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  const handleClick = () => {
    if (options[selectedIndex].value === 'Add services') {
      openDrawer('addServices');
    } else {
      openDrawer('addCategory');
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
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
        const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
        if (establishmentData?.data?.success) {
          setCategories(establishmentData?.data?.data?.categories || []);
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
    const transformedCategories = categories.map((category) => {
      return {
        id: category.categoryId,
        title: category.categoryName,
        rows: category.services.map((service) => ({
          id: service.serviceId,
          service: service.serviceName,
          price: `$${service.startingPrice}`,
          time: `${service.options[0]?.duration || 0} min`, // Assuming first option's duration
          employees: service.employees || [],
        })),
      };
    });

    setData({ components: transformedCategories });
  }, [categories]);

  const handleEditCategory = (categoryId) =>{
    openDrawer('addCategory', categoryId);
  }

  const handleAddCategory = () =>{
    openDrawer('addCategory');
  }

  function handleAddServices(categoryId){
    openDrawer('addServices', categoryId);
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

  return (
    <div>
      <div className="flex mx-24 my-4 justify-between w-10/12">
        <SearchInput
          placeholder={'Search services'}
          onChange={(event: any) => setServiceInput(event.target.value)}
        />
        <div>
          <OptionButton
            selectedIndex={selectedIndex}
            handleClick={handleClick}
            handleMenuItemClick={handleMenuItemClick}
            handleToggle={handleToggle}
            open={open}
            anchorRef={anchorRef}
          />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable
          droppableId="all-components"
          type="component"
          direction="vertical"
        >
          {(provided) => (
            <div
              className="flex flex-col justify-items-center w-5/6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.components.map((component, index) => (
                <Draggable
                  draggableId={component.id}
                  index={index}
                  key={component.id}
                >
                  {(provided) => (
                    <div
                      className="my-4 mx-24 rounded-lg shadow-xl w-full"
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
                            width: "18ch",
                            fontWeight: "700",
                          }}
                          variant="standard"
                        >
                          <div className="flex">
                            <div className="font-bold content-center">{component.title} </div>

                            <IconButton onClick={()=> handleEditCategory(component.id)}>
                              <GetIcon iconName='EditIcon'/>
                            </IconButton>
                          </div>

                        </FormControl>
                        <GetIcon className='mb-3 mr-4' iconName='DragIcon'/>
                        <Button
                          className="flex justify-between items-center font-bold mr-5"
                          onClick={()=> handleDeleteCategory(component.id)}
                        >
                          <GetIcon iconName='DeleteIcon'/>
                          <span>Delete category</span>
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
                                    <div className="flex w-1/4">
                                      <GetIcon {...provided.dragHandleProps} className='mr-4' iconName='DragIcon'/>
                                      {row.service}
                                    </div>
                                    <div className="w-1/4">{row.time}</div>
                                    <div className="w-1/4">{row.price}</div>
                                    <div className="flex items-center justify-end w-1/4">
                                      <div className="flex">
                                        {row.employees.map((employee, index) => (
                                          <GetIcon key={index} iconName='ProfileIcon' className='m-1'/>
                                        ))}
                                      </div>
                                      <div className="ml-2">
                                        <GetIcon
                                          onClick={() => handleDeleteService(component.id, row.id)}
                                          iconName='DeleteIcon'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="h-12 font-bold flex items-center justify-center bottom-0">
                              <button onClick={()=> handleAddServices(component.id)}>
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
              <button onClick={()=> handleAddCategory()} style={{color:'#825FFF', fontSize: '20px', fontWeight: 600, paddingBottom: 30}}>
                                Add new category [+]
                              </button>
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};
