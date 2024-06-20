import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
} from "react-beautiful-dnd";
import { Button } from "../../../components/ui/button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import GetIcon from "../../../assets/Icon/icon";
import { SearchInput, Selector } from "../Appointments/AppointmentControllers";
import { setAddUser } from "../../../store/slices/admin/userAdminSlice";
import { useDrawer } from '../BusinessDrawerContext'
import { ButtonGroup, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

const initialData = {
  components: [
    {
      id: "component-a",
      title: "Hair Styling",
      rows: [
        { id: "a-row-1", service: "Hair Color", price: "$35", time: "20 min",employees: ["employee one", "employee two", 'employee one',] },
        { id: "a-row-2", service: "Hair blue color", price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one'] },
      ],
    },
    {
      id: "component-b",
      title: "Nail",
      rows: [
        { id: "b-row-1", service: "Nail color", price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one', "employee one", "employee one"] },
        { id: "b-row-2", service: "nail color blue", price: "$35", time: "20 min", employees: ["employee one", ] },
      ],
    },
    // {
    //     id: 'component-c',
    //     title: 'Component C',
    //     rows: [
    //       { id: 'c-row-1', service: 'Row C1', price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one', "employee one", "employee one"] },
    //       { id: 'c-row-2', service: 'Row C2', price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one', "employee one"] },
    //     ],
    //   },
  ],
};

const options = ['Add services', 'Add category'];

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
export function Services() {
  const [data, setData] = useState(initialData);
  const [filteredService, setFilteredService] = useState(initialData);

  const [serviceInput, setServiceInput] = useState('');

  const { openDrawer } = useDrawer()

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    if(options[selectedIndex] == 'Add services'){
      openDrawer('addServices')
    }
    else{
      openDrawer('addCategory')
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

  const getServices = (service) => {
    if(!service){
        setData(initialData)
        return
    }
    const Lservice = service.toLowerCase()
    const filteredData = data
    filteredData.components.forEach((serviceArr,index) => {
        serviceArr.rows = serviceArr.rows.filter((row) => {
            if(row.service.toLowerCase().indexOf(Lservice) !== -1){
                return true
            }
            return false
        })
    })


    setData(filteredData)
  }

  const setCategoryName = (id, value) => {
    const newData = {...data}
    newData.components.map((category) => {
        if(category.id === id) {
            category.title = value
        }
        return category
    })
    setData(newData)
  }

  const onDragEnd = (result) => {
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

  return (
    <div>
            <div className="flex mx-24 my-4 justify-between w-10/12">
                <SearchInput
                placeholder={'Search services'}
                value={serviceInput}
                onChange={(event) => {
                    setServiceInput(event.target.value)
                    //getServices(event.target.value)
                }
                  //table.getColumn("email")?.setFilterValue(event.target.value)
                }
                />
                {/* <Selector onSelect={() => { } } className={"w-[180px] justify-evenly"} options={["Add category", "Add service"]} placeholder={"Add new"} label={undefined}/> */}
                <div>
                  {/* <Button variant="outline" size="lg" className="bg-indigo-500 text-white"
                    onClick={() => openDrawer('addServices')}>Add service</Button> */}

                    <ButtonGroup
                      variant="contained"
                      ref={anchorRef}
                      aria-label="Button group with a nested menu"
                    >
                      <Button style={{borderRadius: '5px 0px 0px 5px'}} onClick={handleClick}>{options[selectedIndex]}</Button>
                      <Button
                        style={{height: '40px', borderRadius: '0px 5px 5px 0px'}}
                        size="sm"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </ButtonGroup>
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
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    disabled={index === 2}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
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
                            "&::before": {
                              borderBottom: "none",
                            },
                            "& MuiInputBase-root MuiInput-root ::before": {
                              borderBottom: "none",
                            },
                          }}
                          variant="standard"
                        >
                          <Input
                            type={"text"}
                            className="font-bold"
                            value={component.title}
                            onChange={(value) => {
                                setCategoryName(component.id ,value.target.value)
                            }}
                            sx={{
                                "& ::before": {
                                  borderBottom: "none",
                                },
                                "& MuiInputBase-root MuiInput-root ::before": {
                                  borderBottom: "none",
                                },
                              }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton>
                                    <GetIcon iconName='EditIcon'/>
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <GetIcon className='mb-3 mr-4' iconName='DragIcon'/>
                        <Button
                          variant="ghost"
                          className="flex justify-between items-center font-bold mr-5"
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
                                        <div className="flex">{row.employees.map((employee) => <GetIcon iconName='ProfileIcon' className='m-1'/>)}</div>
                                        <div className="ml-2"><GetIcon onClick={() => console.log("delete clicked")} iconName='DeleteIcon'/></div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                           
                            {provided.placeholder}
                            <div className="h-12 font-bold flex items-center justify-center bottom-0">
                                <button>
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
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
}
