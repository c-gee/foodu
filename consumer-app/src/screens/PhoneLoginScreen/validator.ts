import * as yup from "yup";
import "yup-phone-lite";

export const signInByPhoneSchema = yup.object().shape({
  areaCode: yup.string().trim().required("Area code is required"),
  phone: yup
    .string()
    .trim()
    .phone("MY", "Invalid phone number")
    .required("Phone number is required")
});
