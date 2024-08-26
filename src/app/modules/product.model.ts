import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
});

export const Product = model<TProduct>("Product", productSchema);
