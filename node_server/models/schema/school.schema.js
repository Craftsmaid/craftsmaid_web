const mongoose = require('mongoose');

const schoolSchmea = new mongoose.Schema({
    name: "String",
    location: "String"
})

module.exports = schoolSchmea;