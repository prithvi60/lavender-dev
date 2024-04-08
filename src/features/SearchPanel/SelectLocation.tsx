import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import Text from '../../components/Text';
import Chip from '../../components/Chip';
import { updateSearchLocationList, updateSearchSelectedBox } from '../../store/slices/searchPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const SelectLocation = () => {

    const { selectedBox, showOptionContainer, treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
        (state: any) => state.searchPage
    );
    const dispatch = useDispatch();

    const TempLocationList = [
        'Loction 1', 'Loction 2', 'Loction 3',
    ]

    const handleOnChange = (value) => {
        
        const dataTemp = [...locationList, value];
        dispatch(updateSearchLocationList({ locationList: dataTemp }))
    }

    const handleTagSelect = (tag) => {
        

        // Check if the tag already exists in the newTags list
        const tagAlreadyExists = locationList?.some(existingTag => existingTag === tag);

        if (!tagAlreadyExists) {
            handleOnChange(tag);
        }
    };

    const handleTagRemove = (tag) => {
        
        const updatedTags = locationList?.filter((item) => item !== tag);
        // handleOnChange('treatments', updatedTags);
        dispatch(updateSearchLocationList({ locationList: updatedTags }))
    };
    
    const closeFilterPannel = () => {
        dispatch(updateSearchSelectedBox({ selectedBox: '' }))
    }

    return (
        <div className='home-date-filter'>
            <div className='flex-between-container'>
                <Text variant="body1" align="left" className="bold" name="Choose your Treatments" />
                <CloseIcon onClick={() => closeFilterPannel()} />
            </div>
            <div className='treatment-grid'>
                <Grid container spacing={1}>
                    {locationList?.map((tag, index) => {
                        // 
                        return (
                            <Grid item key={index}>
                                <Chip type={"deletable"} className="delete" label={tag} onDelete={() => handleTagRemove(tag)} />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        {TempLocationList?.map((tag, index) => (
                            <Grid item key={index}>
                                <Chip type={"clickable"} label={tag} onClick={() => handleTagSelect(tag)} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SelectLocation;
