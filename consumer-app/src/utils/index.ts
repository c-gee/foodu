import * as yup from "yup";

export const COUNTRY_CODE = "+60";

export const phoneFormatter = (phone: string) => {
  if (phone.startsWith(COUNTRY_CODE)) {
    return phone;
  } else {
    if (phone.startsWith("0")) {
      return `+6${phone}`;
    }

    return `${COUNTRY_CODE}${phone}`;
  }
};

export const yupPhoneTransformer = (
  value: unknown,
  currenValue: unknown,
  context: yup.StringSchema
): string | undefined => {
  if (context.isType(value) && value !== null && typeof value === "string") {
    return phoneFormatter(value);
  }
};

export const maskText = (
  text: string,
  startPosition: number,
  stopPositon: number
): string => {
  if (startPosition >= stopPositon) {
    throw new Error("Start position cannot be greater than stop position!");
  }
  const stopAt = text.length > stopPositon ? stopPositon : text.length;
  const start = text.slice(0, startPosition);
  const masked = text.slice(startPosition, stopPositon).replace(/./g, "*");
  const end = text.slice(stopAt);

  return start + masked + end;
};
