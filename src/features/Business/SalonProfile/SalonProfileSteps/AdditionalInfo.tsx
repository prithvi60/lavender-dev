import { Select, MenuItem, IconButton, InputLabel, FormControl, Typography } from '@mui/material';
import React, { useState } from 'react'
import GetIcon from '../../../../assets/Icon/icon';
import Chip from '../../../../components/Chip';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';

const sampledata = [{'name': 'English', 'value': 'English'}, {'name': 'French', 'value': 'French'},{'name': 'Spainish', 'value': 'Spainish'},{'name': 'Hindi', 'value': 'Hindi'}]
const chipData = ['Cash', 'Debit Card', 'Credit Card', 'Mobile payment']
const othersData = ['Wheelchair', 'Free wifi', 'Parking', 'Elevator', 'Restrooms']

export const AdditionalInfo = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      if (!selectedItems.includes(newValue)) {
        setSelectedItems([...selectedItems, newValue]);
      }
      setSelectedValue('');
    };
  
    const handleDelete = (itemToDelete) => {
      setSelectedItems(selectedItems.filter(item => item !== itemToDelete));
    };
  
    return (
      <div style={{width: '50%'}}>
         <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Select the language spoken by your staff</Typography>
         <FormControl fullWidth>
         <InputLabel >Language</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleChange}
          IconComponent={ArrowDropDownIcon}
        >
        {sampledata?.map((item)=> (
            <MenuItem value={item.value}><IconButton><GetIcon iconName='PlusIcon'/></IconButton>{item.name}</MenuItem>
        ))}
          
        </Select>
        </FormControl>
        <div>
          {selectedItems.map(item => (
            <Chip
            type={'deletable'}
              key={item}
              label={item}
              onDelete={() => handleDelete(item)}
              deleteIcon={<IconButton><GetIcon iconName='CloseIcon'/></IconButton>}
              style={{  margin: '5px', backgroundColor: '#E6E1FF' }}
            />
          ))}
        </div>
        
        <div style={{marginTop: '30px'}}>
            <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Select all the payment methods your salon accepts</Typography>
            {chipData.map((item)=> (
                <Chip
                type={'deletable'}
                  key={item}
                  label={item}
                  onDelete={() => handleDelete(item)}
                  deleteIcon={<IconButton><GetIcon iconName='CloseIcon'/></IconButton>}
                  style={{  margin: '5px', backgroundColor: '#E6E1FF' }}
                />
            ))}
        </div>

        <div style={{marginTop: '30px'}}>
            <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Check the features your salon offers:</Typography>
            {othersData.map((item)=> (
                <Chip
                type={'deletable'}
                  key={item}
                  label={item}
                  onDelete={() => handleDelete(item)}
                  deleteIcon={<IconButton><GetIcon iconName='CloseIcon'/></IconButton>}
                  style={{  margin: '5px', backgroundColor: '#E6E1FF' }}
                />
            ))}
        </div>

      </div>
    );
  }

