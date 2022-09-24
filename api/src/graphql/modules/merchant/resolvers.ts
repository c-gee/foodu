import { ValidationError } from "yup";

import { merchantInputsSchema, merchantsInputsSchema } from "./validator";
import { handleError } from "../errors";
import { Resolvers, ErrorType } from "../../generated/graphql";
import useMerchant from "../../../repositories/Merchant/index";

const { findMerchants, findMerchantById } = useMerchant();

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

        return {
          merchants,
          lastResultId:
            merchants[merchants.length - 1]?.id || input.lastResultId || 0,
          hasMore: merchants.length === input.limit
        };
      } catch (error) {
        if (error instanceof ValidationError) {
          return handleError(ErrorType.InvalidInputError, error.message);
        }

        return handleError(ErrorType.UnknownError);
      }
    },
    async merchant(_, { input }, { prisma, currentUser }) {
      try {
        if (currentUser === null) {
          return handleError(ErrorType.AuthenticationError);
        }

        await merchantInputsSchema.validate(input);

        const merchant = await findMerchantById(prisma, input);

        if (merchant) {
          return merchant;
        } else {
          return handleError(
            ErrorType.NotFoundError,
            "No such merchant found."
          );
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
