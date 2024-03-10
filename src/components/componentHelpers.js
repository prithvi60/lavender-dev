import { Tabs, Tab, Box, Paper, Typography, Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { ContentCut, Storefront, Search, LocationOn, Clear } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

import './componentHelpers.css';


const getIcon = (type) => {
    const icons = {
        cut: <ContentCut />,
        store: <Storefront />,
        search: <Search />,
        location: <LocationOn />,
        clear: <Clear />
    }

    return (type in icons) ? icons[type] : null;
}

export const TabsWithIcon = props => {
    return (
        <>
            <Tabs
                value={props?.value}
                onChange={props?.handleChange}
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab sx={{ minWidth: 0, width: '50%' }} label={"Treatments"} icon={getIcon("cut")} />
                <Tab sx={{ minWidth: 0, width: '50%' }} label={"Salon"} icon={getIcon("store")} />
            </Tabs>
            <Box sx={{ p: 3 }}>
                {props?.value === 0 && props?.treatment}
                {props?.value === 1 && props?.salon}
            </Box>
        </>

    )
}

export const Banner = () => {
    return (
        <Paper elevation={0}>
            <Typography variant="h5" component="h2" className="b-home-title">
                Welcome to the Lavender UI!
            </Typography>
            <Divider/>
            <Typography className="b-home-header">
                Lorem ipsum.
            </Typography>
        </Paper>
    );
};

export const TabBoxGrid = props => {
    return (
        <Grid container spacing={2} className={props?.classNameGrid}>
            <Grid item xs={5} className={props?.className1}>
                {props?.tab1}
            </Grid>
            <Grid item xs={3} className={props?.className2}>
                {props?.tab2}
            </Grid>
        </Grid>
    );
};

export const SearchBar = props => {
    return (
        <TextField
            className="b-search-bar"
            value={props?.value}
            placeholder={props?.placeholder}
            variant="outlined"
            fullWidth
            name={props?.placeholder}
            onChange={props?.onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" style={{ marginLeft: '-10px' }}>
                        <IconButton>
                            {getIcon(props?.icon)}
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton onClick={props?.onClear} style={{ marginRight: '-20px' }}>
                            {getIcon('clear')}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export const SearchButton = props => {
    return (
        <Button
            className="b-search-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
        >
            Search
        </Button>
    )
}

