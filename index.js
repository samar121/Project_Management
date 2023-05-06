 //POST- When fronted want some calling a data and sending the data.
 //Get- Read the data.
 //PUT/PATCH- For editing the existing the data.
 //Delete
const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors");

const app=express();

mongoose.set('strictQuery', false);

//Connect to mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/pms",{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("connected to mongo DB");
})




//Schema for product Collection
let productschema=new mongoose.Schema({
   name:String,
   price:Number,
   quantity:Number,
   color:String,
   category:String,
   description:String,
   rating:Number
});

let productModel=new mongoose.model('products',productschema);


app.use(express.json());//use middleware data to convert unredable data to redable data
app.use(cors());


//to fetch all product
app.get('/products',async (req,res)=>{
    let products=await productModel.find();
    res.send(products);
})


//to create a new product
app.post('/products',function(req,res){
    let product=req.body;
    let proObj=new productModel(product);
    proObj.save();

    res.send({message:"Product Created",product:proObj});
})

//To delete a product
app.delete("/products/:id",async (req,res)=>{
    await productModel.deleteOne({"_id":req.params.id});
    res.send({message:"Product Deleted"});
});

//To update a product
app.put("/products/:id",async (req,res)=>{
    const id=req.params.id;
    const data=req.body;
    await productModel.updateOne({"_id":id},{$set:data});
    res.send({message:"product updated"});
});


//creating and starting the server
app.listen(8000,function(){
    console.log("server is running");
});
