import { PrismaClient, User } from "@prisma/client";
import { GraphQLYogaError, YogaInitialContext } from "@graphql-yoga/node";

import { verifyToken } from "../lib/jwt";

const authenticateUser = async (
  prisma: PrismaClient,
  initialContext: YogaInitialContext
): Promise<User | null> => {
  const { request } = initialContext;
  const header = request.headers.get("authorization");

  if (header) {
    const token = header.split(" ")[1];
    const result = verifyToken(token);

    if (result?.error) {
      return Promise.reject(new GraphQLYogaError(result.error.message));
    }

    const userId = result.tokenPayload?.sub;

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user;
    }
  }

  return null;
};

export const useAuth = () => ({
  authenticateUser
});
