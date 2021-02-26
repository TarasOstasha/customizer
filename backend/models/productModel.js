const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    size: { type: String, required: true },
    group: { type: String, required: true },
    classification: { type: String, required: true },
    pattern: { type: String, required: true },
    variety: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true }
});


module.exports = mongoose.model('AdminProduct', productSchema);