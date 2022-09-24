import { PrismaClient, RefreshToken } from "@prisma/client";

import { TokenResponse, User } from "../../graphql/generated/graphql";
import {
  AuthMetadata,
  generateRefreshToken,
  generateAccessToken
} from "../../lib/jwt";

type TokenRequest = {
  prisma: PrismaClient;
  user: User;
  authMetadata: AuthMetadata;
  reusableToken?: RefreshToken;
};

const findRefreshToken = async (
  prisma: PrismaClient,
  token: string,
  userId: string
): Promise<RefreshToken> => {
  const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
    where: {
      token_userId: { token: token.trim(), userId: userId.trim() }
    }
  });

  return refreshToken;
};

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

const getTokensResponse = async ({
  prisma,
  user,
  authMetadata,
  reusableToken
}: TokenRequest): Promise<TokenResponse> => {
  const accessToken = generateAccessToken(user, authMetadata);
  const refreshToken = reusableToken
    ? reusableToken.token
    : (await createRefreshToken(prisma, user.id)).token;

  return {
    accessToken,
    refreshToken
  };
};

const useRefreshToken = () => ({
  findRefreshToken,
  getTokensResponse,
  revokeRefreshToken
});

export default useRefreshToken;
