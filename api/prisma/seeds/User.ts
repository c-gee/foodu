import { PrismaClient, Gender } from "@prisma/client";
import casual from "casual";

const NUMBER_USERS_TO_GENERATE = 3;

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.deleteMany({});

  for (let i = 0; i < NUMBER_USERS_TO_GENERATE; i++) {
    await prisma.user.create({
      data: {
        name: casual.full_name,
        nickname: casual.first_name,
        email: casual.email.toLowerCase(),
        gender: casual.random_value(Gender),
        dateOfBirth: new Date(casual.date("YYYY-MM-DD")),
        phone: "+60" + casual.integer(100000000, 199999999).toString(),
        picture: `https://i.pravatar.cc/${150}`
      }
    });
  }

  // Seed users with social profiles
  await prisma.user.create({
    data: {
      name: null,
      nickname: null,
      email: null,
      gender: null,
      dateOfBirth: null,
      phone: null,
      picture: null,
      identities: {
        create: {
          sub: casual.integer(1000, 10000000).toString(),
          provider: "google",
          identityData: {
            name: casual.full_name,
            email: casual.email.toLowerCase(),
            picture: `https://i.pravatar.cc/${150}`
          }
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      name: null,
      nickname: casual.first_name,
      email: casual.email.toLowerCase(),
      gender: null,
      dateOfBirth: null,
      phone: null,
      picture: null,
      identities: {
        create: [
          {
            sub: casual.integer(1000, 10000000).toString(),
            provider: "facebook",
            identityData: {
              name: casual.full_name,
              email: null, // can be null,
              picture: `https://i.pravatar.cc/${150}`
            }
          },
          {
            sub: casual.integer(1000, 10000000).toString(),
            provider: "google",
            identityData: {
              name: casual.full_name,
              email: casual.email.toLowerCase(),
              picture: `https://i.pravatar.cc/${150}`
            }
          }
        ]
      }
    }
  });
}
