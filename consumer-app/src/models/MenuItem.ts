import { Merchant } from "./Merchant";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  displayTag: string | null;
  merchantDetails?: Merchant;
};

export class MenuItemModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public imageURL: string,
    public price: number,
    public displayTag: string | null
  ) {}
}
