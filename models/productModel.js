const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        _id:
        {
            type:Number,
            required:true,
            unique:true
        },
        name:
        {
            type: String,
            required: [true, 'Please enter a product name here']
        },
        quantity:
        {
            type: Number,
            required: true
        },
        price:
        {
            type: Number,
            required: true
        },
        image:
        {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;