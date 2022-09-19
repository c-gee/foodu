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

export const verifyPhoneOtpInputSchema = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .transform(yupPhoneTransformer)
    .phone("MY", true, "Invalid phone number")
    .required("Phone number is required"),
  code: yup.string().trim().required("OTP code is required")
});

export const refreshTokensSchema = yup.object().shape({
  refreshToken: yup.string().trim().required("Refresh token is required"),
  accessToken: yup.string().trim().required("Access token is required")
});

export const signOutSchema = yup.object().shape({
  refreshToken: yup.string().trim()
});

export const updateProfileSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  nickname: yup.string().trim().nullable(),
  dateOfBirth: yup.date().nullable(),
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
    .required("Phone number is required"),
  gender: yup.string().trim().nullable(),
  picture: yup.string().trim().nullable()
});
