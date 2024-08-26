export type TProduct = {
  title: string;
  price: number;
  stock: number /*here stock is assigned insted of available quantity */;
  rating: number;
  image: string;
  brand: string;
  description: string;
};
