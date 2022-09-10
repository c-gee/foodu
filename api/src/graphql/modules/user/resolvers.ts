import { prisma } from "../../../lib/db";
import { Resolvers } from "../../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    async userByEmail(_, args) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email
        }
      });

      return user;
    }
  },
  Mutation: {
    async createUser(_, args) {
      const user = await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          nickname: args.nickname,
          gender: args.gender,
          dateOfBirth: args.dateOfBirth,
          areaCode: args.areaCode,
          phone: args.phone
        }
      });

      return user;
    }
  }
};

export default resolvers;
