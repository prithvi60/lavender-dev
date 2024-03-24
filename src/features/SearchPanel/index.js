import React, { Fragment, useState } from 'react';
import { Grid, Box, Divider, Paper } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import { SEARCH_PANEL_BOXES } from '../../constants/constants';
import Text from '../../components/Text';
import SelectTreatment from './SelectTreatment';

const SearchPanel = () => {
    const [boxControl, setBoxControl] = useState({
        selectedBox: "",
        showOptionContainer: false
    })
    
    const handleBoxClick = (name) => {
        const boxControlTemp = {...boxControl};
        if (boxControl?.selectedBox === name) {
            boxControlTemp.selectedBox = null;
            boxControlTemp.showOptionContainer = false;
        } else {
            boxControlTemp.selectedBox = name;
            boxControlTemp.showOptionContainer = true;
        }
        setBoxControl(boxControlTemp);
    };

    const getDividerSections = () => {
        // ["Treatment", "Location", "Date", "Time"]
        const indexes = [[0,1], []]
        const sections = SEARCH_PANEL_BOXES?.reduce((acc, item) => {
            acc[item] = [0, 1]
            return acc;
        }, {});
    }

 
    return (
        <div className="search-panel">
            <Grid container spacing={0}>
                    {SEARCH_PANEL_BOXES?.map((box, index) => {
                        return (
                            <Fragment key={index}>
                                <Grid key={`grid${index}`} item xs={2.98}>
                                    <SearchBox
                                        name={box}
                                        isClicked={boxControl?.selectedBox === box}
                                        clickHandler={handleBoxClick}
                                    />
                                    
                                </Grid>
                                {index < 3 && <Divider key={index} orientation="vertical" flexItem />}
                                
                            </Fragment>
                            
                        )
                    })}
            </Grid>

            {boxControl?.selectedBox === "Treatment" && boxControl?.showOptionContainer && <Box>
                <Paper elevation={2} className='treatment-panel'>
                    <SelectTreatment />
                </Paper>
            </Box>}
        </div>
     );
}

export default SearchPanel;