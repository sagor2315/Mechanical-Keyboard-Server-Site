import { Request, Response } from "express";
import { productService } from "./product.service";
import createProductValidationSchema from "./product.schema";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParseData = createProductValidationSchema.parse(product);
    const result = await productService.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "product is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
      error: error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchItem = req.query.searchItem as string | undefined;
    const minPrice = req.query.minPrice
      ? parseFloat(req.query.minPrice as string)
      : undefined;
    const maxPrice = req.query.maxPrice
      ? parseFloat(req.query.maxPrice as string)
      : undefined;
    const sortorder = req.query.sortOrder as string | undefined;

    const result = await productService.getProductFromDB(
      searchItem,
      minPrice,
      maxPrice,
      sortorder
    );
    res.status(200).json({
      success: true,
      message: "Product is showing successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Not found",
      error: err.message,
    });
  }
};

const getSinglProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Showing single product successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Not found",
      error: err.message,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const update = {
      $set: {
        title: product.title,
        price: product.price,
        stock: product.stock,
        rating: product.rating,
        image: product.image,
        brand: product.brand,
        description: product.description,
      },
    };
    const result = await productService.updateSingleProductFromDB(
      productId,
      update
    );
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Not Found",
      error: err.message,
    });
  }
};

const updateProductsStock = async (req: Request, res: Response) => {
  const productInfo = req.body;

  try {
    const updatePromises = productInfo.map(
      (product: { _id: string; stock: number }) => {
        const productId = product._id;
        const updates = {
          $set: { stock: product.stock },
        };
        return productService.updateProductsStockFromDB(productId, updates);
      }
    );

    const result = await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Not Found",
      error: err.message,
    });
  }
};

const deleteSingleproduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productService.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: null,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Not found",
      error: err.message,
    });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSinglProduct,
  updateSingleProduct,
  deleteSingleproduct,
  updateProductsStock,
};
