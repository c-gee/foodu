import * as yup from "yup";
import "yup-phone";

import { Provider } from "../../generated/graphql";
import { yupPhoneTransformer } from "../../../utils";

const providers = Object.values(Provider);

export const signUpInputsSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .transform(yupPhoneTransformer)
    .phone("MY", true, "Invalid phone number")
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
  phone: yup
    .string()
    .trim()
    .transform(yupPhoneTransformer)
    .phone("MY", true, "Invalid phone number")
    .required("Phone number is required")
});

export const verifyPhoneOTPInputSchema = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .transform(yupPhoneTransformer)
    .phone("MY", true, "Invalid phone number")
    .required("Phone number is required"),
  code: yup.string().trim().required("OTP code is required")
});

export const signOutSchema = yup.object().shape({
  refreshToken: yup.string().trim()
});
