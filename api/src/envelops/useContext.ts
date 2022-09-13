import { YogaInitialContext } from "@graphql-yoga/node";

import { GraphQLContext } from "../graphql";
import { useAuth } from "./useAuth";
import { prisma } from "../lib/db";

const { authenticateUser } = useAuth();

const createContext = async (
  initialContext: YogaInitialContext
): Promise<GraphQLContext> => {
  return {
    prisma,
    currentUser: await authenticateUser(prisma, initialContext)
  };
};

export const useContext = () => ({
  createContext
});
