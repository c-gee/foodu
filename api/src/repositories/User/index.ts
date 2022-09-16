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
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      areaCode: input.areaCode.trim(),
      phone: input.phone.trim()
    }
  });

  return user;
};

const findUserById = async (prisma: PrismaClient, id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id.trim()
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
      areaCode_phone: {
        areaCode: input.areaCode.trim(),
        phone: input.phone.trim()
      }
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
      provider_sub: {
        provider: input.provider.trim() as Provider,
        sub: input.sub.trim()
      }
    },
    create: {
      sub: input.sub.trim(),
      provider: input.provider.trim() as Provider,
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
        provider_sub: {
          provider: input.provider.trim() as Provider,
          sub: input.sub.trim()
        }
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
