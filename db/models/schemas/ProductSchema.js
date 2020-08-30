
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    imagePaths: [String],
    wasteComposition:[
        {
            name: {type: String, required: true},
            description: String,
            timeToLive: String,
        }
    ],
    instructions: String,
    gtin: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},
})

module.exports = ProductSchema;