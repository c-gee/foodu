import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import e from "express";
import { prisma } from "../../../lib/db";
import { useJwt, JwtPayloadProvider } from "../../../lib/jwt";
import { Resolvers } from "../../generated/graphql";

const { generateToken } = useJwt();

const resolvers: Resolvers = {
  Query: {
    async userById(_, args) {
      const user = await prisma.user.findUnique({
        where: {
          id: args.id
        },
        include: {
          socialProfiles: true
        }
      });

      return user;
    }
  },
  Mutation: {
    async signUp(_, args) {
      try {
        const user = await prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
            areaCode: args.areaCode,
            phone: args.phone
          },
          include: {
            socialProfiles: true
          }
        });

        return generateToken(user, { provider: "phone" });
      } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
          console.log("Error:", error);
        }

        return null;
      }
    },

    async signInByProvider(_, args) {
      return await prisma.$transaction(async (prisma) => {
        let user;

        const socialProfile = await prisma.socialProfile.upsert({
          where: {
            provider_sub: { provider: args.provider, sub: args.sub }
          },
          create: {
            sub: args.sub,
            provider: args.provider,
            name: args.name || null,
            email: args.email || null,
            picture: args.picture || null,
            userId: null
          },
          update: {
            name: args.name || null,
            email: args.email || null,
            picture: args.picture || null
          }
        });

        if (socialProfile.userId === null) {
          const createUser = await prisma.user.create({
            data: {}
          });

          await prisma.socialProfile.update({
            where: {
              provider_sub: { provider: args.provider, sub: args.sub }
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
              socialProfiles: true
            }
          });
        } else {
          user = await prisma.user.findUnique({
            where: {
              id: socialProfile.userId
            },
            include: {
              socialProfiles: true
            }
          });
        }

        if (user) {
          return generateToken(user, {
            provider:
              socialProfile.provider.toLowerCase() as JwtPayloadProvider,
            sub: socialProfile.sub
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
    async signInByPhone(_, args) {
      const user = await prisma.user.findUnique({
        where: {
          phone: args.phone
        },
        include: {
          socialProfiles: true
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
