import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
// instead of using hard code value of port(5000) define like this and port value waise env me hai if nhi hogi toh aur condition me likh di
const PORT = process.env.PORT || 5000;

// function here we use for allow data from json is this
app.use(express.json()); // allows us to accept json data in the req.body

// yhan ke methods product.routes.js me daal diye yhan app.get use kiya tha whan router.get,router.post etc use kiyaa
app.use("/api/products",productRoutes); // api product yhan likh diya toh method me baar baar nhi likha wahan seedha slash use kr liya instead of these lines inplace of slash 

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});