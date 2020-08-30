const mongoose = require('mongoose');

const WasteCompositionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    timeToLive: String,
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},
})

module.exports = WasteComposition = mongoose.model('WasteComposition', WasteCompositionSchema);

