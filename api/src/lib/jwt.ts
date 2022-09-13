import { GraphQLYogaError } from "@graphql-yoga/node";
import {
  sign,
  verify,
  JwtPayload,
  SignOptions,
  VerifyOptions,
  JsonWebTokenError
} from "jsonwebtoken";
import { User } from "../graphql/generated/graphql";

export type JwtPayloadProvider = "google" | "facebook" | "phone";
type AuthMetadata = { provider: JwtPayloadProvider; sub?: string };
type Payload = {
  sub: string;
  auth_metadata: AuthMetadata;
};
type JwtVerificationResult = {
  tokenPayload: JwtPayload | null;
  error?: JsonWebTokenError;
};

const JWT_SECRET = process.env.JWT_SECRET;
const ALGORITHM = "HS256";

const generateToken = (
  user: User,
  provider: { provider: JwtPayloadProvider; sub?: string }
): string => {
  if (!JWT_SECRET) throw new Error("JWT Secret not set!!!");

  const payload: Payload = {
    sub: user.id.toString(), // Internal user id
    auth_metadata: {
      ...provider
    }
  };

  const signOptions: SignOptions = {
    algorithm: ALGORITHM,
    audience: "authenticated",
    expiresIn: "1h",
    issuer: "foodu"
  };

  return sign(payload, JWT_SECRET, signOptions);
};

const verifyToken = (token: string): JwtVerificationResult => {
  if (!JWT_SECRET) throw new Error("JWT Secret not set!!!");

  const verifyOptions: VerifyOptions = {
    algorithms: [ALGORITHM],
    complete: false
  };

  try {
    const tokenPayload = verify(token, JWT_SECRET, verifyOptions);

    return {
      tokenPayload: tokenPayload as JwtPayload
    };
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      return {
        tokenPayload: null,
        error
      };
    }

    return {
      tokenPayload: null
    };
  }
};

export const useJwt = () => ({
  generateToken,
  verifyToken
});
