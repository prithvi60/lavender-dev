import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ImageUploader from '../../../components/ImageUploader';
import CountrySelect from '../../../components/CountrySelect';
import TextArea from '../../../components/TextArea';
import TextField from '../../../components/TextField';
import { addEstablishment, editEstablishment, updateEstablishment, setAddEstablishment, setEstablishmentError } from '../../../store/slices/admin/establishmentAdminSlice';

const FORM_VALUES = [
  {xs: 12, md: 12, type: "textField", id: "name", label: "Name", autoComplete: "name", required: true},
  {xs: 12, md: 12, type: "textArea", id: "about", label: "About", autoComplete: "about", required: false, placeholder: "Input establishment description..."},
  {xs: 12, md: 12, type: "textField", id: "addressLine1", label: "Address Line 1", autoComplete: "address-line1", required: true},
  {xs: 12, md: 12, type: "textField", id: "addressLine2", label: "Address Line 2", autoComplete: "address-line2", required: true},
  {xs: 12, md: 6, type: "textField", id: "area", label: "Area", autoComplete: "area", required: true},
  {xs: 12, md: 6, type: "textField", id: "state", label: "State/Provice/Region", autoComplete: "state", required: true},
  {xs: 12, md: 6, type: "textField", id: "postalCode", label: "Postal Code", autoComplete: "postal-code", required: true},
  {xs: 12, md: 6, type: "countrySelect", id: "country", label: "Country", autoComplete: "country", required: true},
]

const EstablishmentForm = ({ onSubmit }) => {
  const { establishments, editEstablishmentId, businessHours } = useSelector((state) => state.establishmentAdmin);
  const dispatch = useDispatch();
  const initialState = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: "",
      about: "",
      addressLine1: "",
      addressLine2: "",
      area: "",
      state: "",
      postalCode: "",
      country: "",
      images: [],
  };

  const [establishment, setEstablishment] = useState({...initialState});

  const handleOnChange = (key, value) => {
    const establishmentTemp = {...establishment};
    establishmentTemp[key] = value;
    setEstablishment(establishmentTemp);
  }

  const validateData = (data) => {
    for (let key in data) {
      if (!data[key]) {
          return false;
      }
    }
    return true;
  }

  const handleAddEstablishment = () => {
    const valid = validateData(establishment);
    if (!valid) {
      alert('Please provide all required fields');
      dispatch(setEstablishmentError({ establishmentError: true }));
    } else {
      if (editEstablishmentId) {
        dispatch(updateEstablishment({ establishment, businessHours }));
      } else {
        dispatch(addEstablishment({ establishment, businessHours }));
      }
      
      setEstablishment({...initialState});
      dispatch(editEstablishment({editEstablishmentId: null}));
      dispatch(setAddEstablishment({ addEst: false }));
      dispatch(setEstablishmentError({ establishmentError: false }));
    }
    
  };

  useEffect(() => {
      if (editEstablishmentId) {
          const establishmentTemp = establishments?.filter(item => item?.id === editEstablishmentId)?.[0];
          if (establishmentTemp) {
              setEstablishment({...establishmentTemp});
          }
      }
  }, [editEstablishmentId, establishments]);

  useEffect(() => {
    if (onSubmit) {
      handleAddEstablishment();
    }
  }, [onSubmit]);

  return ( <>
    <Fragment>
      <Grid container spacing={2}>
        {FORM_VALUES?.map((item, index) => {
          switch (item?.type) {
            case "textField":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                  <TextField {...item} value={establishment?.[item?.id]} onChange={handleOnChange} />
                </Grid>
              )
            case "textArea":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                  <TextArea
                    {...item}
                    minRows={3}
                    maxRows={3}
                    onChange={(e) => handleOnChange(item?.id, e.target.value)}
                    value={establishment?.[item?.id]}
                  />
                </Grid>
              )
            case "countrySelect":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                  <CountrySelect onChange={(e) => handleOnChange(item?.id, e.target.value)} value={establishment?.[item?.id]}/>
                </Grid>
              )
            default:
              return null;

          }

        })}
        <Grid item xs={12}>
          <ImageUploader images={establishment?.images} setImages={handleOnChange}/>
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default EstablishmentForm;