import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.mdel.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// function here we use for allow data from json is this
app.use(express.json()); // allows us to accept json data in the req.body

// write get method to see all the data
app.get("/api/products", async(req, res) => {

    try{
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); //we use 500 address code bcz this is internal server error
    }
});

// post method for sending data along with request
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

// now update method for updating the details
// patch(for updating few details) and put(for updating all details) methods can use
app.put("/api/products/:id", async(req,res) => {
    const { id } = req.params; // here get the id from request(req).params se that we want to update

    const product = req.body; //field that you want to update
    
    // condition if invalid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product Id"});
    }

    try{
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

// now we create delete method for delete request whichever request you want to delete that's matter right
// and we see in database request or data have specific id so pass that id jis data ko aap delete krna chahte
app.delete("/api/products/:id",async(req,res) => {
    const{ id } = req.params;
    //console.log("id: ", id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch(error){
        console.log("error in deleting product:",error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});