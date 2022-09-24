import { Prisma } from "@prisma/client";

/**
 * Custom types.
 * Remember to add these to codegen.yml too
 */

export type IdentityData =
  | {
      name?: string;
      email?: string;
      picture?: string;
    }
  | Prisma.JsonValue;

export type EmptyResponse = { _?: boolean };
