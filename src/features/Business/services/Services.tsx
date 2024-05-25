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

const initialData = {
  components: [
    {
      id: "component-a",
      title: "Component A",
      rows: [
        { id: "a-row-1", service: "Row A1", price: "$35", time: "20 min",employees: ["employee one", "employee one", 'employee one', "employee one", "employee one"] },
        { id: "a-row-2", service: "Row A2", price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one'] },
      ],
    },
    {
      id: "component-b",
      title: "Component B",
      rows: [
        { id: "b-row-1", service: "Row B1", price: "$35", time: "20 min", employees: ["employee one", "employee one", 'employee one', "employee one", "employee one"] },
        { id: "b-row-2", service: "Row B2", price: "$35", time: "20 min", employees: ["employee one", ] },
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

  const getServices = (service) => {
    if(!service){
        setData(initialData)
        return
    }
    const Lservice = service.toLowerCase()
    const filteredData = data
    filteredData.components.forEach((serviceArr,index) => {
        serviceArr.rows = serviceArr.rows.filter((row) => {
            console.log("forEach >",row.service.toLowerCase().indexOf(Lservice))
            if(row.service.toLowerCase().indexOf(Lservice) !== -1){
                console.log("getServices filter >",Lservice, row.service.toLowerCase(), )
                return true
            }
            return false
        })
    })

    console.log("getServices >", filteredData.components)

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
    console.log("newData >",newData, value, id)
    setData(newData)
  }

  const onDragEnd = (result) => {
    console.log("onDragEnd >", result);
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
                <Selector onSelect={() => { } } className={"w-[180px] justify-evenly"} options={["Add category", "Add service"]} placeholder={"Add new"} label={undefined}/>
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
