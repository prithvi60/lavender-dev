import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export const BusinessInfoSchema = yup.object().shape({
    establishmentName: yup.string().required(),
    establishmentAbout: yup.string().required(),
    phoneNumber: yup.number().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    cityCode: yup.string().required(),
    doorNo: yup.string(),
    zipCode: yup.number().required(),
  });