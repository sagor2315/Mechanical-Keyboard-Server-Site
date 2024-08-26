import { z } from "zod";

const createProductValidationSchema = z.object({
  title: z.string().min(5, "title should be at least 5 character"),
  price: z.number().nonnegative("Price must be a positive number"),
  stock: z.number().int().nonnegative("stock must be positive and integer"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string().url("Img url must be a valid url"),
  brand: z.string().min(1, "brand is required"),
  description: z.string().min(1, "description is required"),
});

export default createProductValidationSchema;
