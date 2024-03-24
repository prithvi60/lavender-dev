import React, { useState } from 'react';
import { Toolbar, Box, MenuItem } from '@mui/material';
import Service from '../Service'; 
import Employee from '../Employee';

const EstablishmentMenu = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    const sections = [
        { title: 'Services', url: '#' },
        { title: 'Employees', url: '#' },
    ];

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    const renderTab = () => {
        switch (selectedTab) {
            case 0:
                return <Service />;
            case 1:
                return <Employee />;
            default:
                return null;
        }
    };

    return (
        <div> 
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ overflowX: 'auto', borderBottom: 1, borderColor: 'divider' }}
            >
                {sections.map((section, index) => (
                    <MenuItem
                        color="inherit"
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                        onClick={() => handleTabChange(index)}
                    >
                        {section.title}
                    </MenuItem>
                ))}
            </Toolbar>
            <Box sx={{ flexGrow: 1 }}>
                {renderTab()}
            </Box>
        </div>
    );
};

export default EstablishmentMenu;
