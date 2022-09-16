import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const testReceiverPhone = process.env.TEST_RECEIVER_PHONE_NUMBER || "";

const client = twilio(accountSid, authToken, {
  lazyLoading: true
});

const phoneToUse = (phone: string): string => {
  if (
    process.env?.NODE_ENV &&
    process.env?.NODE_ENV === "development" &&
    (!testReceiverPhone || testReceiverPhone === "")
  ) {
    throw new Error("Test receiver phone number not set!");
  }

  const formatted =
    process.env.NODE_ENV === "development" ? testReceiverPhone : phone;

  return formatted;
};

export const VERIFICATION_STATUS = {
  pending: "pending",
  approved: "approved",
  canceled: "canceled"
};

export const sendVerification = async (phone: string) => {
  if (!serviceSid) {
    throw new Error("Verify Service SID not set!");
  }

  const verification = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: phoneToUse(phone),
      channel: "sms"
    });

  return verification;
};

export const verifyOTP = async (phone: string, code: string) => {
  if (!serviceSid) {
    throw new Error("Verify Service SID not set!");
  }

  const verification = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: phoneToUse(phone),
      code: code
    });

  return verification;
};
