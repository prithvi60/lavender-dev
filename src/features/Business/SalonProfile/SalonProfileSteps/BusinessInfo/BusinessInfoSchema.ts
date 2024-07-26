import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const BusinessInfoSchema = yup.object().shape({
  establishmentName: yup
    .string()
    .required("Establishment name is required field."),
  establishmentAbout: yup.string().required("About is required field."),
  phoneExtension: yup.string().required("Extension is required field."),
  phoneNumber: yup.number().required("Phone is required field."),
  address: yup.string(),
  email: yup.string().email(),
  cityCode: yup.string().required("City is required field."),
  doorNo: yup.string(),
  zipCode: yup.number().required("Zipcode is required field."),
  areaCode: yup.string(),
  location: yup.string().required(),
  geoX: yup.number(),
  geoY: yup.number(),
});
