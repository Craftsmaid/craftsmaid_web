const express = require("express");
const {
	createMenu,
	getMenus,
	getMenu,
	updateMenu,
	addNewFood,
} = require("../controllers/menu.controller");
const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
	res.send("api calls here");
});

// Menu Updates
apiRouter.post("/createMenu", createMenu);
apiRouter.post("/getMenus", getMenus);
apiRouter.post("/getMenu", getMenu);
apiRouter.post("/updateMenu", updateMenu);
apiRouter.post("/addNewFood", addNewFood);

module.exports = apiRouter;
