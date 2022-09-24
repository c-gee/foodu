import * as yup from "yup";

export const merchantsInputsSchema = yup.object().shape({
  latitude: yup.number().nullable(),
  longitude: yup.number().nullable(),
  limit: yup.number().required(),
  lastResultId: yup.number().required()
});
