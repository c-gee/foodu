import * as yup from "yup";
import "yup-phone-lite";

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
