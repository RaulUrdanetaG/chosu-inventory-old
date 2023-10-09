import { Tag } from './tags';

export interface Item {
  _id: string;
  name: String;
  imagelink: String;
  price: number;
  boughtAt: number;
  location: String;
  owner: string;
  tags: string[];
}
