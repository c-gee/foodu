import {
  sign,
  verify,
  decode,
  JwtPayload,
  SignOptions,
  VerifyOptions,
  JsonWebTokenError
} from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../graphql/generated/graphql";

type JwtPayloadProvider = "google" | "facebook" | "phone";

export type AuthMetadata = { provider: JwtPayloadProvider; sub?: string };

export type PayloadWithAuthMetadata = {
  sub: string;
  auth_metadata: AuthMetadata;
};

type JwtVerificationResult = {
  tokenPayload: JwtPayload | null;
  error?: JsonWebTokenError;
};

const JWT_SECRET = process.env.JWT_SECRET;
const ALGORITHM = "HS256";

export const generateRefreshToken = (): string => {
  const refreshToken = uuidv4().replace(/-/g, "");

  return refreshToken;
};

export const generateAccessToken = (
  user: User,
  authMetadata: AuthMetadata
): string => {
  if (!JWT_SECRET) throw new Error("JWT Secret not set!!!");

  const payload: PayloadWithAuthMetadata = {
    sub: user.id.toString(), // Internal user id
    auth_metadata: {
      ...authMetadata
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

export const verifyToken = (token: string): JwtVerificationResult => {
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

export const decodeToken = (token: string) => {
  const decoded = decode(token);
  return decoded;
};
