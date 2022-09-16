import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ErrorType } from "../../generated/graphql";
import { GraphQLYogaError } from "@graphql-yoga/node";

export const handleError = (errorType: ErrorType, message?: string) => {
  switch (errorType) {
    case ErrorType.InvalidInputError:
      return Promise.reject(
        new GraphQLYogaError(message || "Invalid input.", {
          type: ErrorType.InvalidInputError
        })
      );
    case ErrorType.NotFoundError:
      return Promise.reject(
        new GraphQLYogaError(message || "Entity not found.", {
          type: ErrorType.NotFoundError
        })
      );
    case ErrorType.AuthenticationError:
      return Promise.reject(
        new GraphQLYogaError(message || "Unauthenticated.", {
          type: ErrorType.AuthenticationError
        })
      );
    case ErrorType.NotAllowedError:
      return Promise.reject(
        new GraphQLYogaError(message || "Not allowed.", {
          type: ErrorType.NotAllowedError
        })
      );
    case ErrorType.UnknownError:
      return Promise.reject(
        new GraphQLYogaError(message || "Unknown error.", {
          type: ErrorType.UnknownError
        })
      );
    case ErrorType.InternalServerError:
      return Promise.reject(
        new GraphQLYogaError(message || "Internal server error.", {
          type: ErrorType.InternalServerError
        })
      );
  }
};

const errorsModule = createModule({
  id: "errors-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.graphql"))
});

export default errorsModule;
