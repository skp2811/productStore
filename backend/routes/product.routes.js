import express from "express";

import { getProducts, createProducts, deleteProducts, updateProducts } from "../controllers/product.controller.js";
const router = express.Router();

// earlier i wrote all these methods in server.js but for making more modular write here and from can export   
// write get method to see all the data
router.get("/", getProducts); // iss method ki details in controller js file

// post method for sending data along with request
router.post("/", createProducts);

// now we are tesing without having the frontend(hmne abhi tak frontend design nhi kiya) so we will using postman desktop application jo ki install kiya hai free wala

//console.log(process.env.MONGO_URI);

// now update method for updating the details
// patch(for updating few details) and put(for updating all details) methods can use
router.put("/:id", updateProducts);

// now we create delete method for delete request whichever request you want to delete that's matter right
// and we see in database request or data have specific id so pass that id jis data ko aap delete krna chahte
router.delete("/:id", deleteProducts);


export default router;