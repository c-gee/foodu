import { PrismaClient, Gender } from "@prisma/client";
import casual from "casual";

const prisma = new PrismaClient();
const NUMBER_USERS_TO_GENERATE = 3;

async function main() {
  // Delete all `User` records
  await prisma.user.deleteMany({});

  // (Re-)Create dummy `User` records
  for (let i = 0; i < NUMBER_USERS_TO_GENERATE; i++) {
    await prisma.user.create({
      data: {
        name: casual.full_name,
        nickname: casual.first_name,
        email: casual.email.toLowerCase(),
        gender: casual.random_value(Gender),
        dateOfBirth: new Date(casual.date("YYYY-MM-DD")),
        areaCode: "+60",
        phone: casual.integer(100000000, 199999999).toString()
      }
    });
  }
}

if (process.env.production) {
  console.log("Running seeding on production is not allowed!!!");
} else {
  main().then(() => {
    console.log("Data seeded...");
  });
}
