const express = require("express");
const {
	createMenu,
	getMenus,
	getMenu,
	updateMenu,
	addNewFood,
} = require("../controllers/menu.controller");
const {
	addPlan,
	getPlan,
	getPlansByWeek,
	editPlan,
	deletePlan,
} = require("../controllers/plan.controller");
const { addSchool } = require("../controllers/school.controller");
const {
	addWard,
	editWard,
	getWard,
	getWards,
	deleteWard,
} = require("../controllers/ward.controller");
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

// Plan endpoints
apiRouter.post("/createPlan", addPlan);
apiRouter.post("/getPlan", getPlan);
apiRouter.post("/getPlansByWeek", getPlansByWeek);
apiRouter.post("/editPlan", editPlan);
apiRouter.delete("/delPlan", deletePlan);

// Ward endpoints
apiRouter.post("/createWard", addWard);
apiRouter.post("/editWard", editWard);
apiRouter.post("/getWard", getWard);
apiRouter.post("/getWards", getWards);
apiRouter.post("/deleteWard", deleteWard);

// school
apiRouter.post('/createSchool', addSchool);

// 
module.exports = apiRouter;
