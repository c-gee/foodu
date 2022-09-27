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

        const { first, after, last, before } = input;

        if (after && !first) {
          throw new ValidationError("Cannot have after without first");
        }

        if (last && !before) {
          throw new ValidationError("Last and before must be provided");
        }

        if (first && before) {
          throw new ValidationError("Cannot use first together with before");
        }

        if (last && after) {
          throw new ValidationError("Cannot use last together with after");
        }

        const { merchants, totalResults, hasPreviousPage, hasNextPage } =
          await findMerchants(prisma, input);

        return {
          edges: merchants.map((merchant) => ({
            cursor: merchant.id.toString(),
            node: {
              ...merchant
            }
          })),
          pageInfo: {
            totalResults,
            hasNextPage,
            hasPreviousPage
          }
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
