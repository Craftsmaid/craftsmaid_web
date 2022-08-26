const { default: mongoose } = require("mongoose");
const schoolSchmea = require("./schema/school.schema");

const School = mongoose.model("School", schoolSchmea);

module.exports = School;