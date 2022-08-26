const { default: mongoose } = require("mongoose");
const wardSchema = require("./schema/ward.schema");

const Ward = mongoose.model("Ward", wardSchema);

module.exports = Ward;