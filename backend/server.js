import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.mdel.js";

dotenv.config();
const app = express();

// function here we use for allow data from json is this
app.use(express.json()); // allows us to accept json data in the req.body

// for sending data along with request
app.post("/api/products", async(req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }
    
    // create new product which comes from js file
    const newProduct = new Product(product) // here put the body of product in parenthesis which have some details like product name price etc take from js file

    try{
        await newProduct.save(); // this will save to new database i think
        res.status(201).json({ success: true, data: newProduct});
    } catch (error){
        console.error("Error in create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); //we use 500 address code bcz this is internal server error
    }
});

// now we are tesing without having the frontend(hmne abhi tak frontend design nhi kiya) so we will using postman desktop application jo ki install kiya hai free wala
//console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});