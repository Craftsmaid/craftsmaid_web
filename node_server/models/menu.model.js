const { default: mongoose } = require("mongoose");
const menuSchema = require("./schema/menu.schema");


const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;