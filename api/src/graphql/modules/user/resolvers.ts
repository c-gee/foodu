import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ValidationError } from "yup";

import {
  signUpInputsSchema,
  signInByProviderInput,
  signInByPhoneSchema,
  signOutSchema
} from "./validator";
import { handleError } from "../errors";
import { Resolvers, ErrorType } from "../../generated/graphql";
import { useUser } from "../../../repositories/User";
import { useRefreshToken } from "../../../repositories/RefreshToken";

const {
  createNewUser,
  findUserById,
  findUserByPhone,
  findOrCreateUserWithIdentity
} = useUser();

const { getTokensResponse, revokeRefreshToken } = useRefreshToken();

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

        return getTokensResponse(prisma, user, { provider: "phone" });
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
          return getTokensResponse(prisma, user, {
            provider: identity.provider,
            sub: identity.sub
          });
        } else {
          return handleError(
            ErrorType.InternalServerError,
            "Hmm..., something is wrong. Please try again later, or contact support if the problem persist."
          );
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(ErrorType.UnknownError);
      }
    },

    /**
     * Not complete yet!
     * TODO: Implement OTP code verification
     */
    async signInByPhone(_, { input }, { prisma }) {
      try {
        await signInByPhoneSchema.validate(input);

        const user = await findUserByPhone(prisma, input);

        if (user) {
          return getTokensResponse(prisma, user, { provider: "phone" });
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
