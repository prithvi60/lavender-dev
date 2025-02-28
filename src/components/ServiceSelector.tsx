import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { DotIcon } from 'lucide-react';
import { Selector } from '../features/Business/Appointments/AppointmentControllers';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import GetIcon from '../assets/Icon/icon';
import { StrictModeDroppable } from '../features/Business/services/Services';

const EmployeeList = ({ employees }) => {
    return (
        <>{employees.length > 1 ?
            <Selector
                placeholder={employees[0]}
                options={employees}
                className={''}
                onSelect={() => { }}
            />
            :
            <div>{employees[0]}</div>
        }</>
    )
}

const SelectedService = ({ service, deleteService }) => {
    return (
        <div className='flex justify-between p-4 rounded-lg shadow-lg mb-4'>
            <div className='flex flex-col gap-1.5 w-3/4'>
                <div>{service.options[0].optionName}</div>
                <div className='flex gap-2 items-center'>
                    <span className='border-r border-black/45 pr-2'>{service.options[0].duration} mins</span>
                    <span><EmployeeList employees={service.employees || ['a', 'b']} /></span>
                </div>
            </div>
            <div className='flex flex-col text-right justify-around'>
                <div>$ {service.options[0].salePrice}</div>
                <GetIcon className='cursor-pointer' iconName={'DeleteIcon'} onClick={(() => deleteService(service.options[0].optionId))} />
            </div>
        </div>
    )
}

function ServiceSelector({ selectedServices, setSelectedServices }) {

    const selectService = (category, service, option = {}) => {
        const count = selectedServices.length
        let payload = {
            id: "EST00002507" + count,
            categories: [
                {
                    categoryId: category.categoryId,
                    services: [
                        {
                            ...service,
                            ...(Object.keys(option).length && { options: [option] })
                        }
                    ]
                }
            ]
        }
        if (option) {
            payload.categories[0].services[0].options = [option]
        }
        setSelectedServices((prev) => {
            return [...prev, payload]
        })
    }

    const deleteService = (optionID) => {
        if (selectedServices.length == 1) {
            setSelectedServices([])
        }
        const newSelectedServices = selectedServices.filter((service) => {
            return service.categories[0].services[0].options[0].optionId !== optionID
        })
        setSelectedServices(newSelectedServices)
    }

    const categories = [
        {
            "categoryId": "CAT00002507",
            "categoryName": "Hair treatment",
            "serviceTag": "Hair coloring",
            "services": [
                {
                    "serviceId": "SER00002514",
                    "serviceName": "Women's Haircut",
                    "serviceDescription": "Professional haircut and styling for women.",
                    "gender": "F",
                    "options": [
                        {
                            "optionId": "OPT00002532",
                            "optionName": "Basic Haircut",
                            "salePrice": 50,
                            "maxPrice": 60,
                            "discountPrice": 45,
                            "discountPercentage": 10,
                            "duration": 45
                        },
                        {
                            "optionId": "OPT00002533",
                            "optionName": "Haircut with Styling",
                            "salePrice": 70,
                            "maxPrice": 80,
                            "discountPrice": 63,
                            "discountPercentage": 10,
                            "duration": 60
                        }
                    ],
                    "startingPrice": 45,
                    "employees": [
                        "E123",
                        "E1011234"
                    ],
                    "active": true
                },
                {
                    "serviceId": "SER00002526",
                    "serviceName": "test service",
                    "serviceDescription": "test service",
                    "gender": "M",
                    "options": [
                        {
                            "optionId": "OPT00002553",
                            "optionName": "test service",
                            "salePrice": 123,
                            "maxPrice": null,
                            "discountPrice": null,
                            "discountPercentage": null,
                            "duration": 20
                        }
                    ],
                    "startingPrice": 123,
                    "employees": [
                        "E123"
                    ],
                    "active": true
                },
                {
                    "serviceId": "SER00002529",
                    "serviceName": "test hair",
                    "serviceDescription": "test hair",
                    "gender": "M",
                    "options": [
                        {
                            "optionId": "OPT00002556",
                            "optionName": "test hair",
                            "salePrice": 56,
                            "maxPrice": null,
                            "discountPrice": null,
                            "discountPercentage": null,
                            "duration": 30
                        }
                    ],
                    "startingPrice": 56,
                    "employees": [
                        "EMP00002503"
                    ],
                    "active": true
                },
                {
                    "serviceId": "SER00002530",
                    "serviceName": "Hair dye",
                    "serviceDescription": "Use henna",
                    "gender": "M",
                    "options": [
                        {
                            "optionId": "OPT00002557",
                            "optionName": "Hair dye",
                            "salePrice": 123,
                            "maxPrice": null,
                            "discountPrice": null,
                            "discountPercentage": null,
                            "duration": 30
                        }
                    ],
                    "startingPrice": 123,
                    "employees": [
                        "EMP00002503"
                    ],
                    "active": true
                },
                {
                    "serviceId": "SER00002531",
                    "serviceName": "Hair dye",
                    "serviceDescription": "Use henna",
                    "gender": "M",
                    "options": [
                        {
                            "optionId": "OPT00002558",
                            "optionName": "Hair dye",
                            "salePrice": 123,
                            "maxPrice": null,
                            "discountPrice": null,
                            "discountPercentage": null,
                            "duration": 30
                        }
                    ],
                    "startingPrice": 123,
                    "employees": [
                        "EMP00002503"
                    ],
                    "active": true
                },
            ],
            "active": false
        },
        {
            "categoryId": "CAT00002508",
            "categoryName": "Nails",
            "serviceTag": "Nail",
            "services": [
                {
                    "serviceId": "SER00002515",
                    "serviceName": "Women's Nails",
                    "serviceDescription": "Professional haircut and styling for women.",
                    "gender": "F",
                    "options": [
                        {
                            "optionId": "OPT00002534",
                            "optionName": "Basic nails",
                            "salePrice": 50,
                            "maxPrice": 60,
                            "discountPrice": 45,
                            "discountPercentage": 10,
                            "duration": 45
                        },
                        {
                            "optionId": "OPT00002535",
                            "optionName": "nils with Styling",
                            "salePrice": 70,
                            "maxPrice": 80,
                            "discountPrice": 63,
                            "discountPercentage": 10,
                            "duration": 60
                        }
                    ],
                    "startingPrice": 45,
                    "employees": [
                        "E123",
                        "E1011234"
                    ],
                    "active": true
                }
            ],
            "active": false
        }
    ]
    //useFetchCategories()

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            selectedServices,
            result.source.index,
            result.destination.index
        );

        setSelectedServices(items)
    }
    return (
        <>
            <div className='w-72 relative'>
                <div className='p-2 font-bold'>Service</div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='rounded-lg flex justify-between w-full p-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
                            {/* <div className='font-bold'>Service</div> */}
                            <div className='text-slate-500'>{'Add a new service'}</div>
                            <SearchIcon />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-72 z-[1200] shadow-md rounded-md bg-white p-3.5 overflow-y-scroll no-scrollbar max-h-48 lg:max-h-56'>
                        {categories.map((category) => (
                            <div className='mb-5'>
                                <DropdownMenuLabel>
                                    <div className='flex items-center text-nowrap text-[#825FFF] mb-2.5'>{category.categoryName}
                                        <div className='w-full h-px ml-1 bg-slate-400'></div>
                                    </div>
                                </DropdownMenuLabel>

                                {category.services.map((service) => (
                                    <div>
                                        {/* {service.options.length ? <DropdownMenuItem onClick={() => selectService(category, service)} className='font-semibold'>
                                {service.serviceName}
                            </DropdownMenuItem> :  */}
                                        <div>
                                            {service.serviceName}
                                        </div>
                                        {/* } */}
                                        {service.options.map((option) => (
                                            <DropdownMenuItem onClick={() => selectService(category, service, option)} className='font-normal cursor-pointer'>
                                                <div className='flex my-2'>
                                                    <span><DotIcon /></span>
                                                    {option.optionName}</div>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DragDropContext onDragEnd={onDragEnd}>
                    <StrictModeDroppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='overflow-y-auto w-full h-full max-h-40 md:max-h-[200px] xl:max-h-64 mt-1'
                            >
                                {selectedServices?.map((service, index) => (
                                    <Draggable key={service.categories[0].services[0].options[0].optionId}
                                        draggableId={service.categories[0].services[0].options[0].optionId} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <SelectedService
                                                    service={service.categories[0].services[0]}
                                                    deleteService={deleteService}
                                                />
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
        </>
    )
}

export default ServiceSelector