import * as yup from "yup";

export const merchantsInputsSchema = yup.object().shape({
  query: yup.object().shape({
    latitude: yup.number().nullable(),
    longitude: yup.number().nullable(),
    reverse: yup.boolean().nullable()
  }),
  first: yup.number().positive().nullable(),
  after: yup.string().trim().nullable(),
  last: yup.number().positive().nullable(),
  before: yup.string().trim().nullable()
});

export const merchantInputsSchema = yup.object().shape({
  id: yup.number().required()
});
