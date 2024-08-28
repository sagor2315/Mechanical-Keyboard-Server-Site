import express from "express";
import { productController } from "./product.controller";

const router = express.Router();
router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getSinglProduct);
router.put("/:productId", productController.updateSingleProduct);
router.patch("/", productController.updateProductsStock);
router.delete("/:productId", productController.deleteSingleproduct);

export const productRouter = router;
