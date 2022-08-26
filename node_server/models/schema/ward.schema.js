const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
    name: String,
    class: String,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = wardSchema;