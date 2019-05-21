const mongoose = require('mongoose');

const drillPartsSchema = mongoose.Schema({
    part_number: String,
})

module.exports = mongoose.model('Part', drillPartsSchema);