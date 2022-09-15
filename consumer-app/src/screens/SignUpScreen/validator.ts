import * as yup from "yup";
import "yup-phone-lite";

export const signUpInputsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  areaCode: yup.string().required("Area code is required"),
  phone: yup
    .string()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});
