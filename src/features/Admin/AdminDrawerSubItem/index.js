import React, { useEffect, useState } from "react";
import { AddCircle, ArrowForward } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";

import './index.css';

const AdminDrawerSubItem = ({ items }) => {
    

    const [open, setOpen] = useState({});

    const handleClick = (name) => {
        // put in reducer which drawer item is clicked,

    };

    useEffect(() => {
        const result = items?.reduce((acc, value) => {
            if (value !== undefined) {
              acc[value] = false;
            }
            return acc;
          }, {});
        setOpen(result);
    }, [])

    return (
        items?.map((item, ind) => {
            return (
                <ListItemButton key={ind} sx={{ pl: 5 }} onClick={() => handleClick(item)}>
                    <ListItemIcon className='b-drawer-icon'>
                        <AddCircle fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary={item}/>
                </ListItemButton>
            )  
        })
    )
}

export default AdminDrawerSubItem;