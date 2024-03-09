import React, { Fragment, useState } from 'react';
import { Grid, Box, Divider } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import { SEARCH_PANEL_BOXES } from '../../constants/constants';

import './index.css';


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
        <div className="searchPanel">
            <Grid container spacing={0}>
                {SEARCH_PANEL_BOXES?.map((box, index) => {
                    return (
                        <Fragment key={index}>
                            <Grid key={`grid${index}`} item xs={2.99}>
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
                {"Testing"}
                </Box>}
        </div>
     );
}

export default SearchPanel;