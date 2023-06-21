const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/',(req, res) => {
    res.send('Hello Node API')
})

app.get('/blog',(req, res) => {
    res.send('Hello Blog! My name is Manasvi')
})

// Fetch a product
app.get('/product', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Fetch a product by id
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Save a product
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Update a product
app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            // Product not found
            return res.status(404).json({message: 'Cannot find any product by this id in database'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Delete a product
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product) {
            // Product not found
            return res.status(404).json({message: 'Cannot find any product by this id in database'})
        }
        const deletedProduct = await Product.findById(id)
        res.status(200).json(deletedProduct);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false);
mongoose
.connect('mongodb+srv://manasvi373bagherwal:Weo2OQV6Ydcd4Me7@cluster0.iku2eh6.mongodb.net/')
.then(() => {
    console.log("Connected")
    app.listen(3000, ()=> {
        console.log("Node API app is running on port 3000")
    });
})
.catch(() =>
 {
    console.log(error)
})