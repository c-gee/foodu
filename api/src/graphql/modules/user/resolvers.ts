import { VERIFICATION_STATUS } from "./../../../lib/twilio";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ValidationError } from "yup";

import {
  signUpInputsSchema,
  signInByProviderInput,
  signInByPhoneSchema,
  signOutSchema,
  refreshTokensSchema,
  verifyPhoneOtpInputSchema
} from "./validator";
import { handleError } from "../errors";
import { Resolvers, ErrorType } from "../../generated/graphql";
import { useUser } from "../../../repositories/User";
import { useRefreshToken } from "../../../repositories/RefreshToken";
import { decodeToken, PayloadWithAuthMetadata } from "../../../lib/jwt";
import { sendVerification, verifyOTP } from "../../../lib/twilio";
import { isTokenRefreshable } from "../../../utils";

const {
  createNewUser,
  findUserById,
  findUserByPhone,
  findOrCreateUserWithIdentity
} = useUser();

const { findRefreshToken, getTokensResponse, revokeRefreshToken } =
  useRefreshToken();

const resolvers: Resolvers = {
  Query: {
    async me(_, __, { prisma, currentUser }) {
      if (currentUser === null) {
        return handleError(ErrorType.AuthenticationError);
      }

      const user = await findUserById(prisma, currentUser.id);

      if (user) {
        return user;
      } else {
        return handleError(ErrorType.NotFoundError, "No such user found.");
      }
    }
  },
  Mutation: {
    async signUp(_, { input }, { prisma }) {
      try {
        await signUpInputsSchema.validate(input);

        const user = await createNewUser(prisma, input);

        return { userId: user.id };
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            if (
              (error.meta?.target as (string | undefined)[]).includes("email")
            ) {
              return handleError(
                ErrorType.InvalidInputError,
                "Account already exists for this email."
              );
            }

            if (
              (error.meta?.target as (string | undefined)[]).includes("phone")
            ) {
              return handleError(
                ErrorType.InvalidInputError,
                "Account already exists for this phone number."
              );
            }
          }
        }

        return handleError(ErrorType.UnknownError);
      }
    },

    async signInByProvider(_, { input }, { prisma }) {
      try {
        await signInByProviderInput.validate(input);

        const { user, identity } = await findOrCreateUserWithIdentity(
          prisma,
          input
        );

        if (user) {
          return getTokensResponse({
            prisma,
            user,
            authMetadata: {
              provider: identity.provider,
              sub: identity.sub
            }
          });
        } else {
          return handleError(
            ErrorType.InternalServerError,
            "Hmm..., something is wrong. Please try again later, or contact support if the problem persists."
          );
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(ErrorType.UnknownError);
      }
    },

    async signInByPhone(_, { input }, { prisma }) {
      try {
        await signInByPhoneSchema.validate(input);

        const user = await findUserByPhone(prisma, input);

        if (user) {
          const verification = await sendVerification(input.phone);

          if (verification.status === VERIFICATION_STATUS.pending) {
            return { userId: user.id, phone: user.phone as string };
          } else {
            return handleError(
              ErrorType.InternalServerError,
              "Hmm..., something is wrong. Please try again later, or contact support if the problem persists."
            );
          }
        } else {
          return handleError(ErrorType.NotFoundError, "No such user found.");
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(
          ErrorType.UnknownError,
          "Hmm..., something is wrong. Please try again later, or contact support if the problem persists."
        );
      }
    },

    async verifyPhoneOtp(_, { input }, { prisma }) {
      try {
        await verifyPhoneOtpInputSchema.validate(input);

        const user = await findUserByPhone(prisma, {
          phone: input.phone
        });

        if (user) {
          const verification = await verifyOTP(input.phone, input.code);

          if (verification.status === VERIFICATION_STATUS.approved) {
            return getTokensResponse({
              prisma,
              user,
              authMetadata: { provider: "phone" }
            });
          } else {
            return handleError(
              ErrorType.AuthenticationError,
              "Phone OTP verification failed."
            );
          }
        } else {
          return handleError(ErrorType.NotFoundError, "No such user found.");
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(ErrorType.UnknownError);
      }
    },

    async refreshTokens(_, { input }, { prisma }) {
      try {
        await refreshTokensSchema.validate(input);

        if (input?.accessToken && input?.refreshToken) {
          const payload = decodeToken(
            input?.accessToken
          ) as PayloadWithAuthMetadata;

          if (payload?.sub) {
            const refreshToken = await findRefreshToken(
              prisma,
              input.refreshToken,
              payload.sub
            );

            const isRefreshable = isTokenRefreshable(refreshToken);
            const user = await findUserById(prisma, payload.sub);

            if (isRefreshable && user) {
              return getTokensResponse({
                prisma,
                user,
                authMetadata: {
                  provider: payload.auth_metadata.provider
                },
                reusableToken: refreshToken
              });
            } else {
              if (user) {
                await revokeRefreshToken(prisma, input.refreshToken, user.id);
              }

              return handleError(
                ErrorType.InvalidInputError,
                "Refresh token has expired or been revoked."
              );
            }
          } else {
            return handleError(
              ErrorType.InvalidInputError,
              "Invalid access token."
            );
          }
        } else {
          return handleError(
            ErrorType.InvalidInputError,
            "Both access token and refresh token must be provided."
          );
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return handleError(
              ErrorType.InvalidInputError,
              "Invalid refresh token."
            );
          }
        }

        return handleError(ErrorType.UnknownError);
      }
    },

    async signOut(_, { input }, { prisma, currentUser }) {
      try {
        await signOutSchema.validate(input);

        if (currentUser === null) {
          return handleError(ErrorType.AuthenticationError);
        }

        if (input?.refreshToken) {
          await revokeRefreshToken(prisma, input.refreshToken, currentUser.id);
        }

        return {};
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return handleError(
              ErrorType.InvalidInputError,
              "Invalid refresh token."
            );
          }
        }

        return handleError(ErrorType.UnknownError);
      }
    }
  }
};

export default resolvers;
