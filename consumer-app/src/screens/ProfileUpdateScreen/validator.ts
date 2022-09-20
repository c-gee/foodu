import * as yup from "yup";
import "yup-phone";
import { yupPhoneTransformer } from "../../utils";

export const updateProfileSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  nickname: yup.string().trim(),
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
  // gender: yup.string().trim(),
  picture: yup.string().trim()
});
