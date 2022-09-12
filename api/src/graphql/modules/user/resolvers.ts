import { prisma } from "../../../lib/db";
import { Resolvers } from "../../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    async userByEmail(_, args) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email
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
      const user = await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          nickname: args.nickname,
          gender: args.gender,
          dateOfBirth: args.dateOfBirth,
          areaCode: args.areaCode,
          phone: args.phone,
          picture: args.picture
        },
        include: {
          socialProfiles: true
        }
      });

      return user;
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
            data: {
              socialProfiles: {
                create: {
                  sub: args.sub,
                  provider: args.provider,
                  name: args.name || null,
                  email: args.email || null,
                  picture: args.picture || null
                }
              }
            }
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

        return user;
      });
    },

    async signInByPhone(_, args) {
      const user = await prisma.user.findUnique({
        where: {
          phone: args.phone
        },
        include: {
          socialProfiles: true
        }
      });

      return user;
    }
  }
};

export default resolvers;
