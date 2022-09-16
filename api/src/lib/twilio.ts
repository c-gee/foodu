import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const testReceiverPhone = process.env.TEST_RECEIVER_PHONE_NUMBER || "";

const client = twilio(accountSid, authToken, {
  lazyLoading: true
});

const formatPhone = (areaCode: string, phone: string): string => {
  if (
    process.env?.NODE_ENV &&
    process.env?.NODE_ENV === "development" &&
    (!testReceiverPhone || testReceiverPhone === "")
  ) {
    throw new Error("Test receiver phone number not set!");
  }

  const formatted =
    process.env.NODE_ENV === "development"
      ? testReceiverPhone
      : `${areaCode}${phone}`;

  return formatted;
};

export const VERIFICATION_STATUS = {
  pending: "pending",
  approved: "approved",
  canceled: "canceled"
};

export const sendVerification = async (areaCode: string, phone: string) => {
  if (!serviceSid) {
    throw new Error("Verify Service SID not set!");
  }

  const verification = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: formatPhone(areaCode, phone),
      channel: "sms"
    });

  return verification;
};

export const verifyOTP = async (
  areaCode: string,
  phone: string,
  code: string
) => {
  if (!serviceSid) {
    throw new Error("Verify Service SID not set!");
  }

  const verification = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: formatPhone(areaCode, phone),
      code: code
    });

  return verification;
};
