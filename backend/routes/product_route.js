import express from "express";
import Product from "../models/product.js";
import mongoose from "mongoose";

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const product = await Product.find({});
        res.status(200).json({success : true , data : product});
    }
    catch(e){
        res.status(500).json({success : false , message : "Server Error"});
    }
});

router.post('/', async (req,res) => {
    const product = req.body;   

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false , message : "Please Provide valid details"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true , data : newProduct});
    }
    catch(e){
        console.log("Error in Creating Product" , e.message);
        res.status(500).json({success:false , message : "Server Error"});
    }
});


router.delete('/:id', async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Invalid Product Id"});
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(201).json({success:true , message : "Product Deleted"});
    }
    catch(e){
        res.status(500).json({success : false , message : "Product not find"});
    }
});


router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Invalid Product Id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id , product,{new:true});
        res.status(200).json({success : true , data : updatedProduct});
    }
    catch(e){
        res.status(500).json({success : false , message : "Server Error"});
    }
});



export default router