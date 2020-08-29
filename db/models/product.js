const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    imagePaths: [String],
    wasteComposition:[
        {
            name: String,
            description: String,
            timeToLive: Number,
        }
    ],
    instructions: String,
    gtin: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},
})

module.exports = Product = mongoose.model('product', ProductSchema);

