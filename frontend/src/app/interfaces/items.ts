import { Tag } from './tags';

export interface Item {
  _id: string;
  name: string;
  imagelink: String;
  price: number;
  boughtAt: number;
  location: String;
  owner: string;
  tags: string[];
}
