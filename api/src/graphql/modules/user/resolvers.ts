import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLYogaError } from "@graphql-yoga/node";
import { ValidationError } from "yup";

import {
  signUpInputsSchema,
  signInByProviderInput,
  signInByPhoneSchema,
  signOutSchema
} from "./validator";
import { Resolvers } from "../../generated/graphql";
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
        return Promise.reject(new GraphQLYogaError("Unauthenticated!"));
      }

      const user = await findUserById(prisma, currentUser.id);

      if (user) {
        return user;
      } else {
        return Promise.reject(new GraphQLYogaError("No such user found."));
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
          return Promise.reject(new GraphQLYogaError(error.message));
        }

        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            if (
              (error.meta?.target as (string | undefined)[]).includes("email")
            ) {
              return Promise.reject(
                new GraphQLYogaError("Account already exists for this email.")
              );
            }

            if (
              (error.meta?.target as (string | undefined)[]).includes("phone")
            ) {
              return Promise.reject(
                new GraphQLYogaError(
                  "Account already exists for this phone number."
                )
              );
            }
          }
        }

        return Promise.reject(
          new GraphQLYogaError("Oh no! There seems to be a problem.")
        );
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
          return Promise.reject(
            new GraphQLYogaError(
              "Hmm..., something is wrong. Please try again later, or contact support if the problem persist."
            )
          );
        }
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          return Promise.reject(new GraphQLYogaError(error.message));
        }

        return Promise.reject(
          new GraphQLYogaError("Oh no! There seems to be a problem.")
        );
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
          return Promise.reject(new GraphQLYogaError("No such user found."));
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          return Promise.reject(new GraphQLYogaError(error.message));
        }

        return Promise.reject(
          new GraphQLYogaError("Oh no! There seems to be a problem.")
        );
      }
    },

    async signOut(_, { input }, { prisma, currentUser }) {
      try {
        await signOutSchema.validate(input);

        if (currentUser === null) {
          return Promise.reject(new GraphQLYogaError("Unauthenticated!"));
        }

        if (input?.refreshToken) {
          await revokeRefreshToken(prisma, input.refreshToken, currentUser.id);
        }

        return {};
      } catch (error) {
        if (error instanceof ValidationError) {
          return Promise.reject(new GraphQLYogaError(error.message));
        }

        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            return Promise.reject(
              new GraphQLYogaError("Invalid refresh token.")
            );
          }
        }

        return Promise.reject(new GraphQLYogaError("Unknown error."));
      }
    }
  }
};

export default resolvers;
