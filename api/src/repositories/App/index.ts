import { PrismaClient } from "@prisma/client";

export const DEFAULT_LOCATION = {
  latitude: 3.1385059,
  longitude: 101.6869895
};

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
