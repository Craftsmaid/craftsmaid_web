const { default: mongoose } = require("mongoose");
const dayMenuSchema = require("./schema/DayMenu.schema");


const DayMenu = mongoose.model("DayMenu", dayMenuSchema);

module.exports = DayMenu;