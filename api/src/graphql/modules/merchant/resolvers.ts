import { ValidationError } from "yup";

import { merchantsInputsSchema } from "./validator";
import { handleError } from "../errors";
import { Resolvers, ErrorType } from "../../generated/graphql";
import useMerchant from "../../../repositories/Merchant/index";

const { findMerchants } = useMerchant();

const resolvers: Resolvers = {
  Query: {
    async merchants(_, { input }, { prisma, currentUser }) {
      try {
        if (currentUser === null) {
          return handleError(ErrorType.AuthenticationError);
        }

        await merchantsInputsSchema.validate(input);

        // Should eventually be finding nearest merchants by user location
        const merchants = await findMerchants(prisma, input);

        if (merchants && merchants.length > 0) {
          return {
            merchants,
            lastResultId: merchants[merchants.length - 1].id,
            hasMore: true
          };
        } else {
          return {
            merchants: [],
            lastResultId: input.lastResultId,
            hasMore: false
          };
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(ErrorType.UnknownError);
      }
    }
  }
};

export default resolvers;
