import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import { Button } from '../../../../components/Button';
import ImageUploader from '../../../../components/ImageUploader';
import CountrySelect from '../../../../components/CountrySelect';
import TextArea from '../../../../components/TextArea';
import { addEstablishment, editEstablishment, updateEstablishment } from '../../../../store/slices/admin/establishmentAdminSlice';

const FORM_VALUES = [
  {xs: 12, md: 12, type: "textField", id: "name", label: "Name", autoComplete: "name", variant: "outlined", required: true},
  {xs: 12, md: 12, type: "textArea", id: "about", label: "About", autoComplete: "about", variant: "outlined", required: false, placeholder: "Input establishment description..."},
  {xs: 12, md: 12, type: "textField", id: "addressLine1", label: "Address Line 1", autoComplete: "address-line1", variant: "outlined", required: true},
  {xs: 12, md: 12, type: "textField", id: "addressLine2", label: "Address Line 2", autoComplete: "address-line2", variant: "outlined", required: true},
  {xs: 12, md: 6, type: "textField", id: "area", label: "Area", autoComplete: "area", variant: "outlined", required: true},
  {xs: 12, md: 6, type: "textField", id: "state", label: "State/Provice/Region", autoComplete: "state", variant: "outlined", required: true},
  {xs: 12, md: 6, type: "textField", id: "postalCode", label: "Postal Code", autoComplete: "postal-code", variant: "outlined", required: true},
  {xs: 12, md: 6, type: "countrySelect", id: "country", label: "Country", autoComplete: "country", variant: "outlined", required: true},
]

const EstablishmentForm = () => {
  const { establishments, editEstablishmentId } = useSelector((state) => state.establishmentAdmin);
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
  };

  const [establishment, setEstablishment] = useState({...initialState});

  const handleOnChange = (key, value) => {
    const establishmentTemp = {...establishment};
    establishmentTemp[key] = value;
    setEstablishment(establishmentTemp);
  }

  const handleAddEstablishment = () => {
      if (editEstablishmentId) {
          dispatch(updateEstablishment({ establishment }));
      } else {
          dispatch(addEstablishment({ establishment }));
      }
      
      setEstablishment({...initialState});
      dispatch(editEstablishment({editEstablishmentId: null}));
  };

  useEffect(() => {
      if (editEstablishmentId) {
          const establishmentTemp = establishments?.filter(item => item?.id === editEstablishmentId)?.[0];
          if (establishmentTemp) {
              setEstablishment({...establishmentTemp});
          }
          
      }
  }, [editEstablishmentId, establishments])

  return ( <>
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography>{`${editEstablishmentId ? "Edit" : "Add"} New Establishment`}</Typography>
        </Grid>
        {FORM_VALUES?.map((item, index) => {
          switch (item?.type) {
            case "textField":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="b-grid">
                  <TextField
                    required={item?.required}
                    id={item?.id}
                    name={item?.id}
                    label={item?.label}
                    fullWidth
                    autoComplete={item?.autoComplete}
                    variant={item?.variant}
                    onChange={(e) => handleOnChange(item?.id, e.target.value)}
                    value={establishment?.[item?.id]}
                  />
                </Grid>
              )
            case "textArea":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="b-grid">
                  <TextArea 
                    label={item?.label}
                    placeholder={item?.placeholder}
                    minRows={3}
                    maxRows={3}
                    onChange={(e) => handleOnChange(item?.id, e.target.value)}
                    value={establishment?.[item?.id]}
                  />
                </Grid> 
              )
            case "countrySelect":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="b-grid">
                  <CountrySelect onChange={handleOnChange} value={establishment?.[item?.id]}/>
                </Grid>
              )
            default:
              return null;

          }

        })}
        <Grid item xs={12}>
          <ImageUploader />
        </Grid>
        <Grid item xs={12}>
          <Button
              onClick={handleAddEstablishment}
              name={"Submit"}
              sx={{ mt: 3, ml: 1 }}
          />
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default EstablishmentForm;