import express from "express";
import { mongoConnect } from "./config/db.js";
import productRoutes from "./routes/product_route.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', productRoutes);

app.listen(5000 , ()=> {
    mongoConnect();
    console.log("Server Started at http://localhost:5000");
});

