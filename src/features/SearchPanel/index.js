import React, { Fragment, useState } from 'react';
import { Grid, Box, Divider, Paper } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import { SEARCH_PANEL_BOXES } from '../../constants/constants';
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

            {boxControl?.selectedBox === "Treatment" && boxControl?.showOptionContainer && <Grid>
                <Paper elevation={2} className='container'>
                    <SelectTreatment />
                </Paper>
            </Grid>}

            {boxControl?.selectedBox === "Location" && boxControl?.showOptionContainer && 
                <Grid container spacing={2}>
                <Grid item xs={false} sm={false} md={3} lg={3} />
                <Grid item xs={12} sm={12} md={9} lg={9} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={2} className='container'>
                        <SelectTreatment />
                    </Paper>
                </Grid>
              </Grid>
            }
        </div>
     );
}

export default SearchPanel;