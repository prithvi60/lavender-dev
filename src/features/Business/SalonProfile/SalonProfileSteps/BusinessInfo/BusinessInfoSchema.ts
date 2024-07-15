import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export const BusinessInfoSchema = yup.object().shape({
    establishmentName: yup.string().required(),
    establishmentAbout: yup.string().required(),
    phoneExtension: yup.string().required(),
    phoneNumber: yup.number().required(),
    address: yup.string(),
    email: yup.string().email(),
    cityCode: yup.string().required(),
    doorNo: yup.string(),
    zipCode: yup.number().required(),
    areaCode: yup.string(),
  });