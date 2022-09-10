import { Gender } from "@prisma/client";
import { prisma } from "../../../lib/db";

export default {
  Query: {
    async userByEmail(parent: unknown, args: { email: string }) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email
        }
      });

      return user;
    }
  },
  Mutation: {
    async createUser(
      parent: unknown,
      args: {
        email: string;
        name?: string;
        nickname?: string;
        gender?: Gender;
        dateOfBirth?: Date;
        areaCode?: string;
        phone?: string;
      }
    ) {
      const user = await prisma.user.create({
        data: {
          email: args.email,
          name: args?.name,
          nickname: args?.nickname,
          gender: args?.gender,
          dateOfBirth: args?.dateOfBirth,
          areaCode: args?.areaCode,
          phone: args?.phone
        }
      });

      return user;
    }
  }
};
