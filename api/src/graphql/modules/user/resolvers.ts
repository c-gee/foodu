import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { Resolvers } from "../../generated/graphql";
import { useJwt } from "../../../lib/jwt";

const { generateToken } = useJwt();

const resolvers: Resolvers = {
  Query: {
    async user(_, args, { prisma }) {
      const user = await prisma.user.findUnique({
        where: {
          id: args.id
        },
        include: {
          identities: true
        }
      });

      return user;
    }
  },
  Mutation: {
    async signUp(_, { input }, { prisma }) {
      try {
        const user = await prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
            areaCode: input.areaCode,
            phone: input.phone
          },
          include: {
            identities: true
          }
        });

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

        return null;
      }
    },

    async signInByProvider(_, { input }, { prisma }) {
      return await prisma.$transaction(async (prisma) => {
        let user;

        const identity = await prisma.identity.upsert({
          where: {
            provider_sub: { provider: input.provider, sub: input.sub }
          },
          create: {
            sub: input.sub,
            provider: input.provider,
            identityData: input.identityData,
            userId: null
          },
          update: {
            identityData: input.identityData
          }
        });

        if (identity.userId === null) {
          const createUser = await prisma.user.create({
            data: {}
          });

          await prisma.identity.update({
            where: {
              provider_sub: { provider: input.provider, sub: input.sub }
            },
            data: {
              userId: createUser.id
            }
          });

          user = await prisma.user.findUnique({
            where: {
              id: createUser.id
            },
            include: {
              identities: true
            }
          });
        } else {
          user = await prisma.user.findUnique({
            where: {
              id: identity.userId
            },
            include: {
              identities: true
            }
          });
        }

        if (user) {
          return generateToken(user, {
            provider: identity.provider,
            sub: identity.sub
          });
        } else {
          return null;
        }
      });
    },

    /**
     * Not complete yet!
     * TODO: Implement OTP code verification
     */
    async signInByPhone(_, { input }, { prisma }) {
      const user = await prisma.user.findUnique({
        where: {
          areaCode_phone: { areaCode: input.areaCode, phone: input.phone }
        },
        include: {
          identities: true
        }
      });

      if (user) {
        return generateToken(user, { provider: "phone" });
      } else {
        return null;
      }
    }
  }
};

export default resolvers;
