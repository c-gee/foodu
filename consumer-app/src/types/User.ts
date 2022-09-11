import { Gender } from "./Gender";

export type User = {
  id?: number;
  email?: string;
  name?: string;
  nickname?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  areaCode?: string;
  phone?: string;
  createAt?: Date;
  updatedAt?: Date;
};
