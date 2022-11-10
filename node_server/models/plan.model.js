const { default: mongoose } = require("mongoose");
const planSchema = require("./schema/plan.schema");

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;