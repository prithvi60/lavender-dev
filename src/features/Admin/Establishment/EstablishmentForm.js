import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ImageUploader from '../../../components/ImageUploader';
import CountrySelect from '../../../components/CountrySelect';
import TextArea from '../../../components/TextArea';
import TextField from '../../../components/TextField';
import { addEstablishment, editEstablishment, updateEstablishment } from '../../../store/slices/admin/establishmentAdminSlice';

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
  }, [editEstablishmentId, establishments]);

  useEffect(() => {
    handleAddEstablishment();
  }, [onSubmit]);

  return ( <>
    <Fragment>
      <Grid container spacing={2}>
        {FORM_VALUES?.map((item, index) => {
          switch (item?.type) {
            case "textField":
              return (
                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                  <TextField {...item} value={establishment?.[item?.id]} handleOnChange={handleOnChange} />
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
      </Grid>
    </Fragment>
  </>);
}

export default EstablishmentForm;