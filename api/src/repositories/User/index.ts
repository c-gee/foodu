import { PrismaClient } from "@prisma/client";
import {
  Provider,
  SignInByPhoneInput,
  SignInByProviderInput,
  SignUpInput
} from "../../graphql/generated/graphql";

const createNewUser = async (prisma: PrismaClient, input: SignUpInput) => {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      areaCode: input.areaCode,
      phone: input.phone
    }
  });

  return user;
};

const findUserById = async (prisma: PrismaClient, id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      identities: true
    }
  });

  return user;
};

const findUserByPhone = async (
  prisma: PrismaClient,
  input: SignInByPhoneInput
) => {
  const user = await prisma.user.findUnique({
    where: {
      areaCode_phone: { areaCode: input.areaCode, phone: input.phone }
    },
    include: {
      identities: true
    }
  });

  return user;
};

const findOrCreateUserWithIdentity = async (
  prisma: PrismaClient,
  input: SignInByProviderInput
) => {
  let user;

  const identity = await prisma.identity.upsert({
    where: {
      provider_sub: { provider: input.provider as Provider, sub: input.sub }
    },
    create: {
      sub: input.sub,
      provider: input.provider as Provider,
      identityData: input.identityData,
      userId: null
    },
    update: {
      identityData: input.identityData
    }
  });

  if (identity.userId === null) {
    const createUser = await prisma.user.create({
      data: {}
    });

    await prisma.identity.update({
      where: {
        provider_sub: { provider: input.provider as Provider, sub: input.sub }
      },
      data: {
        userId: createUser.id
      }
    });

    user = await prisma.user.findUnique({
      where: {
        id: createUser.id
      },
      include: {
        identities: true
      }
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        id: identity.userId
      },
      include: {
        identities: true
      }
    });
  }

  return { user, identity };
};

export const useUser = () => ({
  createNewUser,
  findUserById,
  findUserByPhone,
  findOrCreateUserWithIdentity
});
