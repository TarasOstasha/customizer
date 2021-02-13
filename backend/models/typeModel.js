const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    prodType: { type: String, require: true  }
});


module.exports = mongoose.model('Types', typeSchema);