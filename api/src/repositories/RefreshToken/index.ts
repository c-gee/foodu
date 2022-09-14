import { PrismaClient } from "@prisma/client";

import { TokenResponse, User } from "../../graphql/generated/graphql";
import {
  AuthMetadata,
  generateRefreshToken,
  generateAccessToken
} from "../../lib/jwt";

const createRefreshToken = async (prisma: PrismaClient, userId: string) => {
  const refreshToken = await prisma.refreshToken.create({
    data: {
      userId: userId,
      token: generateRefreshToken()
    }
  });

  return refreshToken;
};

const getTokensResponse = async (
  prisma: PrismaClient,
  user: User,
  provider: AuthMetadata
): Promise<TokenResponse> => {
  const accessToken = generateAccessToken(user, provider);
  const refreshToken = (await createRefreshToken(prisma, user.id)).token;

  return {
    accessToken,
    refreshToken
  };
};

export const useRefreshToken = () => ({
  getTokensResponse
});
