const Menu = require("./../models/menu.model");
const DayMenu = require("./../models/dayMenu.model");

// Create Menu Item
async function createMenu(req, res) {
	const { name, dayMenus, week } = req.body;
	try {
		// Create A new menu for school Ordering
		let days = [];
		// if(Array.isArray(dayMenus) && dayMenus.length > 0) return res.send("works");
		for (let i = 0; i < dayMenus.length; i++) {
			if (!(await DayMenu.find({ name: dayMenus[i].name, week: week }))) {
				let day = new DayMenu({
					name: dayMenus[i].name,
					foodItems: dayMenus[i].foodItems,
					week,
				});
				let { _id } = await day.save();
				days.push(_id);
			}
		}
		if(days.length < 1) {
			return res.status(401).json({
				status: 'Failed',
				message: 'Menu for some days already exist'
			})
		}

		const menu = new Menu({
			name,
			days,
			week,
		});

		await menu.save();
		res.status(201).json({
			status: "Successful",
			data: menu,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
}

// obtain Menu Items
async function getMenus(req, res) {
	try {
		const menus = await Menu.find().populate("days");

		res.status(201).json({
			status: "Successful",
			data: menus,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
}

//Obtain a menu Item
async function getMenu(req, res) {
	const { menuId } = req.body;
	try {
		const menu = await Menu.findById(menuId);

		res.status(201).json({
			status: "Successful",
			data: menu,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
}

// Update Menu
async function updateMenu(req, res) {
	const { menuId, update } = req.body;
	try {
		const menu = await Menu.updateOne(
			{ _id: menuId },
			{
				$set: update,
			}
		);

		res.status(201).json({
			status: "Successful",
			message: "Update Successful",
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
}

// Add New FoodItems
async function addNewFood(req, res) {
	const { dayName, week, foodItems } = req.body;
	try {
		const menu = await DayMenu.find({ name: dayName, week });
		if (Array.isArray(foodItems)) {
			foodItems.map((item) => {
				if (!menu.foodItems.includes(item)) menu.foodItems.push(item);
			});
		}

		await menu.save();
		res.status(201).json({
			status: "Successful",
			data: menu,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
}

module.exports = {
	createMenu,
	getMenu,
	getMenus,
	updateMenu,
	addNewFood,
};
