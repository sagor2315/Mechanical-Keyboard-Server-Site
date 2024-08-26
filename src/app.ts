import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { productRouter } from "./app/modules/product.route";

// parser
app.use(express.json());
app.use(cors());

// all routes
app.use("/api/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
