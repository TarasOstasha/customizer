const mongoose = require('mongoose');

const optionsSchema = mongoose.Schema({
    prodColor: { type: String, require: true },
    prodMaterial: { type: String, require: true  },
    prodType: { type: String, require: true  }
});


module.exports = mongoose.model('Options', optionsSchema);