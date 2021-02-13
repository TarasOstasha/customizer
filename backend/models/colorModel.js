const mongoose = require('mongoose');

const colorsSchema = mongoose.Schema({
    prodColor: { type: String, require: true },
});


module.exports = mongoose.model('Colors', colorsSchema);