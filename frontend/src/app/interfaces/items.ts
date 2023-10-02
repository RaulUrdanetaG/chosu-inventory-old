import { Tag } from "./tags";

export interface Item {
  name: String;
  imagelink: String;
  price: number;
  location: String;
  tags: Tag[];
}

