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

    const [selectedChips, setSelectedChips] = useState([]);

    const [otherChips, setOtherChips] = useState([]);


    const handleChipClick = (item) => {
        if (selectedChips.includes(item)) {
            setSelectedChips(selectedChips.filter(chip => chip !== item));
        } else {
            setSelectedChips([...selectedChips, item]);
        }
    };

    const handleOtherChipClick = (item) => {
        if (otherChips.includes(item)) {
            setOtherChips(otherChips.filter(chip => chip !== item));
        } else {
            setOtherChips([...otherChips, item]);
        }
    };

    const handleChipDelete = (item) => {
        setSelectedChips(selectedChips.filter(chip => chip !== item));
    };

    const handleOtherChipDelete = (item) => {
        setOtherChips(otherChips.filter(chip => chip !== item));
    };
  
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
        <div>
            <div className='text-5xl font-bold text-center p-2' style={{color: '#4D4D4D'}}>Additional information (optional)</div>
            <div className='text-xl font-normal text-center p-2 mb-8' style={{color: '#4D4D4D'}}>Provide  additional details to enhance your salon profile </div>

            <div style={{width: '50%'}}>
                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Select the language spoken by your staff</Typography>
                <FormControl fullWidth>
                <InputLabel sx={{display: 'flex'}}><GetIcon iconName='LanguageIcon'/>    Language</InputLabel>
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
                
                <div style={{ marginTop: '30px' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>Select all the payment methods your salon accepts</Typography>
                    {chipData.map((item) => (
                        <Chip
                            type={selectedChips.includes(item) ? 'deletable' : 'clickable'}
                            key={item}
                            label={item}
                            onDelete={() => handleChipDelete(item)}
                            deleteIcon={
                                selectedChips.includes(item) ? (
                                    <IconButton ><GetIcon iconName='CloseIcon'/></IconButton>
                                ) : undefined
                            }
                            onClick={() => handleChipClick(item)}
                            style={{
                                margin: '5px',
                                backgroundColor: selectedChips.includes(item) ? '#E6E1FF' : '#F2F2F2',
                            }}
                        />
                    ))}
                </div>

                <div style={{marginTop: '30px'}}>
                    <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Check the features your salon offers:</Typography>
                    {othersData.map((item) => (
                        <Chip
                            type={otherChips.includes(item) ? 'deletable' : 'clickable'}
                            key={item}
                            label={item}
                            onDelete={() => handleOtherChipDelete(item)}
                            deleteIcon={
                                otherChips.includes(item) ? (
                                    <IconButton ><GetIcon iconName='CloseIcon'/></IconButton>
                                ) : undefined
                            }
                            onClick={() => handleOtherChipClick(item)}
                            style={{
                                margin: '5px',
                                backgroundColor: otherChips.includes(item) ? '#E6E1FF' : '#F2F2F2',
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>

    );
  }

