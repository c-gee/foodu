import { handleError } from "../errors";
import { Resolvers, ErrorType } from "../../generated/graphql";
import useApp from "../../../repositories/App";

const { getAppVars } = useApp();

const resolvers: Resolvers = {
  Query: {
    async appVars(_, __, { prisma }) {
      try {
        const appVars = await getAppVars(prisma);

        return appVars;
      } catch (error) {
        return handleError(ErrorType.UnknownError);
      }
    }
  }
};

export default resolvers;
