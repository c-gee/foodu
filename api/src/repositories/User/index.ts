import { PrismaClient } from "@prisma/client";
import {
  Gender,
  Provider,
  SignInByPhoneInput,
  SignInByProviderInput,
  SignUpInput,
  UpdateProfileInput
} from "../../graphql/generated/graphql";

import { phoneFormatter } from "../../utils";

const createNewUser = async (prisma: PrismaClient, input: SignUpInput) => {
  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      phone: phoneFormatter(input.phone.trim())
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
      phone: input.phone.trim()
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

const updateUserProfile = async (
  prisma: PrismaClient,
  input: UpdateProfileInput,
  userId: string
) => {
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      email: input.email.toLowerCase().trim(),
      name: input.name.trim(),
      nickname: input.nickname?.trim(),
      phone: phoneFormatter(input.phone.trim()),
      dateOfBirth: input?.dateOfBirth && new Date(input.dateOfBirth),
      gender: input.gender as Gender,
      picture: input.picture
    }
  });

  return user;
};

const useUser = () => ({
  createNewUser,
  findUserById,
  findUserByPhone,
  findOrCreateUserWithIdentity,
  updateUserProfile
});

export default useUser;
