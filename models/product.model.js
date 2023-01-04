const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true

    },
    richDescription: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },
    rating: {
        type: Number,
    }
})
module.exports = mongoose.model('product', productSchema);
