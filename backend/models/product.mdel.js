import mongoose from 'mongoose';

// create a schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},{
    timestamps: true // createAt, updateAt make sure timestamp is createAt and updateAt as well
});

// now create product model
const Product = mongoose.model('Product', productSchema);

export default Product;
