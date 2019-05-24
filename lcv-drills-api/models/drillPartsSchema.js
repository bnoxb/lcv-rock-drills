const mongoose = require('mongoose');

const drillPartsSchema = mongoose.Schema({
    part_number: {type: String, unique: true, required: true},
    company: {type: String, required: true},
    type: {type: String, required: true},
    companyKey: {type: String, required: true}
});

module.exports = mongoose.model('Part', drillPartsSchema);