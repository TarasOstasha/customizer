const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    prodMaterial: { type: String, require: true  }
});


module.exports = mongoose.model('Materials', materialSchema);