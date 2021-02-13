const mongoose = require('mongoose');

const dimensionsSchema = mongoose.Schema({
    prodDimensions: { type: String, require: true  }
});


module.exports = mongoose.model('Dimensions', dimensionsSchema)