import * as yup from "yup";
import "yup-phone-lite";

import { Provider } from "../../generated/graphql";

const providers = Object.values(Provider);

export const signUpInputsSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email")
    .required("Email is required"),
  areaCode: yup.string().trim().required("Area code is required"),
  phone: yup
    .string()
    .trim()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});

export const signInByProviderInput = yup.object().shape({
  provider: yup
    .string()
    .trim()
    .oneOf(providers)
    .required("Provider is required"),
  sub: yup.string().trim().required("Sub is required"),
  identityData: yup.object().shape({
    name: yup.string().trim().nullable(),
    email: yup.string().trim().lowercase().email().nullable(),
    picture: yup.string().trim().url().nullable()
  })
});

export const signInByPhoneSchema = yup.object().shape({
  areaCode: yup.string().trim().required("Area code is required"),
  phone: yup
    .string()
    .trim()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});

export const verifyPhoneOTPInputSchema = yup.object().shape({
  areaCode: yup.string().trim().required("Area code is required"),
  phone: yup
    .string()
    .trim()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required"),
  code: yup.string().trim().required("OTP code is required")
});

export const signOutSchema = yup.object().shape({
  refreshToken: yup.string().trim()
});
