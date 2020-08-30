const mongoose = require('mongoose');
const ProductSchema = require('./schemas/ProductSchema');

module.exports = ProductForReview = mongoose.model('productForReview', ProductSchema);

