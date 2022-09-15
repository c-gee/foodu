import * as yup from "yup";
import "yup-phone-lite";

import { Provider } from "../../generated/graphql";

const providers = Object.values(Provider);

export const signUpInputsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  areaCode: yup.string().required("Area code is required"),
  phone: yup
    .string()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});

export const signInByProviderInput = yup.object().shape({
  provider: yup.string().oneOf(providers).required("Provider is required"),
  sub: yup.string().required("Sub is required"),
  identityData: yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().email().nullable(),
    picture: yup.string().url().nullable()
  })
});

export const signInByPhoneSchema = yup.object().shape({
  areaCode: yup.string().required("Area code is required"),
  phone: yup
    .string()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});

export const signOutSchema = yup.object().shape({
  refreshToken: yup.string()
});
