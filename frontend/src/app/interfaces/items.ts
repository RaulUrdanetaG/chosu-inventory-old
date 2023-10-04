import { Tag } from './tags';

export interface Item {
  _id: string;
  name: String;
  imagelink: String;
  price: number;
  location: String;
  tags: Tag[];
}
