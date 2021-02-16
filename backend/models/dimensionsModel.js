const mongoose = require('mongoose');

const dimensionsSchema = mongoose.Schema({
    width: Number,
    height: Number,
    price: Number
});


module.exports = mongoose.model('Dimensions', dimensionsSchema)