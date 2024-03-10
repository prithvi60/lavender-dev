import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddCircle, ArrowForward } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { saveOpenDrawer } from "../../../store/slices/adminPageSlice";

import './index.css';

const AdminDrawerSubItem = ({ items }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState({});

    const handleClick = (name) => {
        const openTemp = {...open};
        openTemp[name] = true;
        setOpen(openTemp);

        if (name) {
            dispatch(saveOpenDrawer({openDrawer: name}));
        }
    };

    useEffect(() => {
        const result = items?.reduce((acc, value) => {
            if (value !== undefined) {
              acc[value] = false;
            }
            return acc;
          }, {});
        setOpen(result);
    }, [items]);

    // useEffect(() => {

    // }, [openDrawer]);

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