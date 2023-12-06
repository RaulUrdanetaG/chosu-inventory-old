export interface Item {
  _id: string;
  name: string;
  imagelink: string[];
  price: number;
  boughtAt: number;
  location: string;
  owner: string;
  description: string;
  tags: string[];
  sold: boolean;
}
