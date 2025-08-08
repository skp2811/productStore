import mongoose from "mongoose"; // use mongoose for connecting with mogno database
import Product from "../models/product.mdel.js";

export const getProducts = async(req, res) => {

    try{
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); //we use 500 address code bcz this is internal server error
    }
};

export const createProducts = async(req, res) => {
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
};

export const updateProducts = async(req,res) => {
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
};

export const deleteProducts = async(req,res) => {
    const{ id } = req.params;
    //console.log("id: ", id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch(error){
        console.log("error in deleting product:",error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};