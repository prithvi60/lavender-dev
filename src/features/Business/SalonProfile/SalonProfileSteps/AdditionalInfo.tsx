import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
  Typography,
  Button,
} from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';
import Chip from '../../../../components/Chip';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import endpoint from '../../../../api/endpoints';

const sampledata = [
  { name: 'English', value: 'English' },
  { name: 'French', value: 'French' },
  { name: 'Spanish', value: 'Spanish' },
  { name: 'Hindi', value: 'Hindi' },
];

const chipData = ['Cash', 'Debit Card', 'Credit Card', 'Mobile payment'];

const othersData = ['Wheelchair', 'Free wifi', 'Parking', 'Elevator', 'Restrooms'];

const schema = yup.object().shape({
  language: yup.array().min(1).required(),
  paymentChips: yup.array().min(1).nullable(),
  otherChips: yup.array().min(1).nullable(),
});

export const AdditionalInfo = ({
  userDetails,
  languages: initialLanguages,
  paymentTypes: initialPaymentTypes,
  features: initialFeatures,
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPaymentChips, setSelectedPaymentChips] = useState([]);
  const [otherChips, setOtherChips] = useState([]);
  const establishmentId = userDetails ? userDetails.establishmentId : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      language: [],
      paymentChips: [],
      otherChips: [],
    },
  });

  useEffect(() => {
    if (initialLanguages && initialLanguages.length > 0) {
      setSelectedLanguages(initialLanguages);
      setValue('language', initialLanguages);
    }
    if (initialPaymentTypes) {
      const initialPaymentChips = chipData.filter(
        (chip) => initialPaymentTypes[chip.toLowerCase().replace(' ', '')]
      );
      setSelectedPaymentChips(initialPaymentChips);
      setValue('paymentChips', initialPaymentChips);
    }
    if (initialFeatures) {
      const initialOtherChips = othersData.filter(
        (chip) => initialFeatures[chip.toLowerCase().replace(' ', '')]
      );
      setOtherChips(initialOtherChips);
      setValue('otherChips', initialOtherChips);
    }
  }, [initialLanguages, initialPaymentTypes, initialFeatures, setValue]);

  const handleChangeLanguages = (event) => {
    const { value } = event.target;
    setSelectedLanguages(value);
    setValue('language', value); // Update form value for validation
  };

  const handleChipClick = (item) => {
    const updatedChips = selectedPaymentChips.includes(item)
      ? selectedPaymentChips.filter((chip) => chip !== item)
      : [...selectedPaymentChips, item];
    setSelectedPaymentChips(updatedChips);
    setValue('paymentChips', updatedChips); // Update form value for validation
  };

  const handleOtherChipClick = (item) => {
    const updatedChips = otherChips.includes(item)
      ? otherChips.filter((chip) => chip !== item)
      : [...otherChips, item];
    setOtherChips(updatedChips);
    setValue('otherChips', updatedChips); // Update form value for validation
  };

  const handleChipDelete = (item) => {
    const updatedChips = selectedPaymentChips.filter((chip) => chip !== item);
    setSelectedPaymentChips(updatedChips);
    setValue('paymentChips', updatedChips); // Update form value for validation
  };

  const handleOtherChipDelete = (item) => {
    const updatedChips = otherChips.filter((chip) => chip !== item);
    setOtherChips(updatedChips);
    setValue('otherChips', updatedChips); // Update form value for validation
  };

  const onSubmit = (data) => {
    const formData = {
      id: establishmentId,
      paymentTypes: selectedPaymentChips.reduce((acc, chip) => {
        acc[chip.toLowerCase().replace(' ', '')] = true;
        return acc;
      }, {}),
      languages: selectedLanguages,
      features: otherChips.reduce((acc, chip) => {
        acc[chip.toLowerCase().replace(' ', '')] = true;
        return acc;
      }, {}),
    };

    console.log('formData: ', formData);
    alert(JSON.stringify(formData));

    // Assuming endpoint.saveEstablishmentAdditionalInfo(formData); needs formData as argument
    const response = endpoint.saveEstablishmentAdditionalInfo(formData);
  };

  return (
    <div>
      <div className='text-5xl font-bold text-center p-2' style={{ color: '#4D4D4D' }}>
        Additional information (optional)
      </div>
      <div className='text-xl font-normal text-center p-2 mb-8' style={{ color: '#4D4D4D' }}>
        Provide additional details to enhance your salon profile{' '}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '50%' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
            Select the language spoken by your staff
          </Typography>
          <FormControl fullWidth>
            <InputLabel sx={{ display: 'flex' }}>
              <GetIcon iconName='LanguageIcon' /> Language
            </InputLabel>
            <Select
              {...register('language', { required: true })}
              multiple
              value={selectedLanguages}
              onChange={handleChangeLanguages}
              IconComponent={ArrowDropDownIcon}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() =>
                        setSelectedLanguages(
                          selectedLanguages.filter((lang) => lang !== value)
                        )
                      }
                      style={{ margin: 2 }}
                    />
                  ))}
                </div>
              )}
            >
              {sampledata?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  <IconButton>
                    <GetIcon iconName='PlusIcon' />
                  </IconButton>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.language && <span>This field is required</span>}
          </FormControl>

          <div style={{ marginTop: '10px' }}>
            {selectedLanguages.map((item) => (
              <Chip
                key={item}
                label={item}
                onDelete={() =>
                  setSelectedLanguages(
                    selectedLanguages.filter((lang) => lang !== item)
                  )
                }
                deleteIcon={
                  <IconButton>
                    <GetIcon iconName='CloseIcon' />
                  </IconButton>
                }
                style={{ margin: '5px', backgroundColor: '#E6E1FF' }}
              />
            ))}
          </div>

          <div style={{ marginTop: '30px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
              Select all the payment methods your salon accepts
            </Typography>
            {chipData.map((item) => (
              <Chip
                type={selectedPaymentChips.includes(item) ? 'deletable' : 'clickable'}
                key={item}
                label={item}
                onDelete={() => handleChipDelete(item)}
                deleteIcon={
                  selectedPaymentChips.includes(item) ? (
                    <IconButton>
                      <GetIcon iconName='CloseIcon' />
                    </IconButton>
                  ) : undefined
                }
                onClick={() => handleChipClick(item)}
                style={{
                  margin: '5px',
                  backgroundColor: selectedPaymentChips.includes(item)
                    ? '#E6E1FF'
                    : '#F2F2F2',
                }}
              />
            ))}
            {errors.paymentChips && <span>This field is required</span>}
          </div>

          <div style={{ marginTop: '30px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
              Check the features your salon offers:
            </Typography>
            {othersData.map((item) => (
              <Chip
                type={otherChips.includes(item) ? 'deletable' : 'clickable'}
                key={item}
                label={item}
                onDelete={() => handleOtherChipDelete(item)}
                deleteIcon={
                  otherChips.includes(item) ? (
                    <IconButton>
                      <GetIcon iconName='CloseIcon' />
                    </IconButton>
                  ) : undefined
                }
                onClick={() => handleOtherChipClick(item)}
                style={{
                  margin: '5px',
                  backgroundColor: otherChips.includes(item) ? '#E6E1FF' : '#F2F2F2',
                }}
              />
            ))}
            {errors.otherChips && <span>This field is required</span>}
          </div>

          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
