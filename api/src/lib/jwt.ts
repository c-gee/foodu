import {
  sign,
  verify,
  JwtPayload,
  SignOptions,
  VerifyOptions
} from "jsonwebtoken";
import { User } from "../graphql/generated/graphql";

export type JwtPayloadProvider = "google" | "facebook" | "phone";
type AuthMetadata = { provider: JwtPayloadProvider; sub?: string };
type Payload = {
  sub: string;
  auth_metadata: AuthMetadata;
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

const validateToken = (token: string): JwtPayload => {
  if (!JWT_SECRET) throw new Error("JWT Secret not set!!!");

  const verifyOptions: VerifyOptions = {
    algorithms: [ALGORITHM],
    complete: false
  };

  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, verifyOptions, (error, decoded) => {
      if (error) {
        reject(error);
      }

      resolve(decoded);
    });
  });
};

export const useJwt = () => ({
  generateToken,
  validateToken
});
