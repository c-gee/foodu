import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { Resolvers } from "../../generated/graphql";
import { useUser } from "../../../repositories/User";
import { useJwt } from "../../../lib/jwt";

const { generateToken } = useJwt();
const {
  createNewUser,
  findUserById,
  findUserByPhone,
  findOrCreateUserWithIdentity
} = useUser();

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
        const user = await createNewUser(prisma, input);

        return generateToken(user, { provider: "phone" });
      } catch (error: unknown) {
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
      const { user, identity } = await findOrCreateUserWithIdentity(
        prisma,
        input
      );

      if (user) {
        return generateToken(user, {
          provider: identity.provider,
          sub: identity.sub
        });
      } else {
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
      const user = await findUserByPhone(prisma, input);

      if (user) {
        return generateToken(user, { provider: "phone" });
      } else {
        return Promise.reject(new GraphQLYogaError("No such user found."));
      }
    }
  }
};

export default resolvers;
