import React, {Fragment} from 'react';
import { TextareaAutosize } from '@mui/base';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import CountrySelect from '../../../../components/CountrySelect';
import TextArea from '../../../../components/TextArea';

import '../index.css';

const AddressForm = () => {

  const FORM_VALUES = [
    {xs: 12, sm: 12, type: "textField", id: "name", label: "Name", autoComplete: "name", variant: "standard", required: true},
    {xs: 12, sm: 12, type: "textArea", id: "about", label: "About", autoComplete: "about", variant: "standard", required: false, placeholder: "Input establishment description..."},
    {xs: 12, sm: 12, type: "textField", id: "addrLine1", label: "Address Line 1", autoComplete: "address-line1", variant: "standard", required: true},
    {xs: 12, sm: 12, type: "textField", id: "addrLine2", label: "Address Line 2", autoComplete: "address-line2", variant: "standard", required: true},
    {xs: 12, sm: 6, type: "textField", id: "area", label: "Area", autoComplete: "address-line2", variant: "standard", required: true},
    {xs: 12, sm: 6, type: "textField", id: "state", label: "State/Provice/Region", autoComplete: "given-name", variant: "standard", required: true},
    {xs: 12, sm: 6, type: "textField", id: "postalCode", label: "Postal Code", autoComplete: "postal-code", variant: "standard", required: true},
    {xs: 12, sm: 6, type: "countrySelect", id: "country", label: "Country", autoComplete: "country", variant: "standard", required: true},
  ]

  return (
    <Fragment>
      <Grid container spacing={3}>
        {FORM_VALUES?.map((item, index) => {
          
          switch (item?.type) {
            case "textField":
              return (
                <Grid key={index} item xs={item?.xs} sm={item?.sm} className="b-grid">
                  <TextField
                    required={item?.required}
                    id={item?.id}
                    name={item?.id}
                    label={item?.label}
                    fullWidth
                    autoComplete={item?.autoComplete}
                    variant={item?.variant}
                  />
                </Grid>
              )
            case "textArea":
              return (
                <Grid key={index} item xs={item?.xs} sm={item?.sm} className="b-grid">
                  <TextArea 
                    label={item?.label}
                    placeholder={item?.placeholder}
                    minRows={3}
                    maxRows={3}
                  />
                 </Grid> 
              )
            case "countrySelect":
              return (
                <Grid key={index} item xs={item?.xs} sm={item?.sm} className="b-grid">
                  <CountrySelect />
                </Grid>
              )

          }

        })}
      </Grid>
    </Fragment>
  );
}

export default AddressForm;