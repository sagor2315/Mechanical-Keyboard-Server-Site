import { TProduct } from "./product.interface";
import { Product } from "./product.model";

type ProductFilter = {
  $or?: Array<{ title?: RegExp; brand?: RegExp }>;
  price?: {
    $gte?: number;
    $lte?: number;
  };
};

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProductFromDB = async (
  searchItem: string | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  sortOrder: string | undefined
) => {
  const filter: ProductFilter = {};

  if (searchItem) {
    const searchProduct = new RegExp(searchItem, "i");
    filter.$or = [{ title: searchProduct }, { brand: searchProduct }];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  let sortOption: { [key: string]: 1 | -1 } = { _id: -1 };

  if (sortOrder === "desc" || sortOrder === "asc") {
    sortOption = { price: sortOrder === "desc" ? -1 : 1 };
  }

  const result = await Product.find(filter).sort(sortOption);
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  return result;
};

const updateSingleProductFromDB = async (_id: string, updateData: object) => {
  const result = await Product.findOneAndUpdate({ _id }, updateData, {
    new: true,
    upsert: true,
  });
  return result;
};

const updateProductsStockFromDB = async (_id: string, updateData?: object) => {
  const result = await Product.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const result = await Product.deleteOne({ _id });
  return result;
};

export const productService = {
  createProductIntoDB,
  getProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
  updateProductsStockFromDB,
};
