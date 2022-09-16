import * as yup from "yup";
import "yup-phone";
import { yupPhoneTransformer } from "../../utils";

export const signInByPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .transform(yupPhoneTransformer)
    .phone("MY", true, "Invalid phone number")
    .required("Phone number is required")
});
