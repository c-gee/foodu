import { PrismaClient } from "@prisma/client";

const getAppVars = async (prisma: PrismaClient) => {
  const currencies = await prisma.currency.findMany();

  return {
    currencies
  };
};

const useApp = () => ({
  getAppVars
});

export default useApp;
