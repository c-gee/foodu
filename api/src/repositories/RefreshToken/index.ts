import { PrismaClient, RefreshToken } from "@prisma/client";

import { TokenResponse, User } from "../../graphql/generated/graphql";
import {
  AuthMetadata,
  generateRefreshToken,
  generateAccessToken
} from "../../lib/jwt";

const revokeRefreshToken = async (
  prisma: PrismaClient,
  token: string,
  userId: string
): Promise<RefreshToken> => {
  const refreshToken = await prisma.refreshToken.update({
    where: {
      token_userId: { token: token.trim(), userId: userId.trim() }
    },
    data: {
      revoked: true
    }
  });

  return refreshToken;
};

const createRefreshToken = async (
  prisma: PrismaClient,
  userId: string
): Promise<RefreshToken> => {
  const refreshToken = await prisma.refreshToken.create({
    data: {
      userId: userId.trim(),
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
  getTokensResponse,
  revokeRefreshToken
});
