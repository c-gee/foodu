import { Currency } from "@prisma/client";
import * as yup from "yup";
import { RefreshToken } from "../graphql/generated/graphql";

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
  _currenValue: unknown,
  context: yup.StringSchema
): string | undefined => {
  if (context.isType(value) && value !== null && typeof value === "string") {
    return phoneFormatter(value);
  }
};

const REFRESH_TOKEN_VALID_DAYS = 90;

const isTokenExpired = (tokenCreatedDate: Date): boolean => {
  const daysAgoInMs = REFRESH_TOKEN_VALID_DAYS * 24 * 60 * 60 * 1000;
  const daysAgoTimestamp = new Date().getTime() - daysAgoInMs;
  const tokenCreatedAtTimestamp = tokenCreatedDate.getTime();

  if (daysAgoTimestamp > tokenCreatedAtTimestamp) {
    return true;
  }
  return false;
};

export const isTokenRefreshable = (token: RefreshToken): boolean => {
  if (!token.createdAt) return false;

  return !token.revoked && !isTokenExpired(token.createdAt);
};

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

export const formatMoney = (amount: number, currency: Currency) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: currency.code
  })
    .format(amount / currency.magnifier)
    .replace(/\s/g, "");
};
