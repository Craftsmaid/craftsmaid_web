const Plan = require("../models/plan.model");

//create plan
const addPlan = async (req, res) => {
	const { ward, weekDate, items, user } = req.body;
	try {
		console.log(req.body);
		const plan = new Plan({
			ward,
			weekDate,
			items,
			user,
		});

		await plan.save();
		res.status(200).json({
			status: "Success",
			data: plan,
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

// get Plan by Ward
const getPlan = async (req, res) => {
	const { ward, user } = req.body;
	try {
		const plan = await Plan.findOne({ ward, user }).populate("ward");
		if (!plan) {
			return res.status(400).json({
				status: "Failed",
				message: "You need to have created the plan",
			});
		}
		res.status(200).json({
			status: "Sucess",
			data: plan,
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

// get plans per weekDate
const getPlansByWeek = async (req, res) => {
	const { weekDate, user } = req.body;
	try {
		const plans = await Plan.find({ weekDate, user }).populate("ward");
		if (!plans) {
			return res.status(400).json({
				status: "Failed",
				message: "You need to have created the plan",
			});
		}
		res.status(200).json({
			status: "Sucess",
			data: plans,
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

// edit plans
const editPlan = async (req, res) => {
	const { planId, update, user } = req.body;
	try {
		const checkValidity = await Plan.findOne({ _id: planId, user }).populate(
			"ward"
		);
		if (!checkValidity) {
			return res.status(400).json({
				status: "Failed",
				message: "You need to have created the plan",
			});
		}
		const plan = await Plan.updateOne(
			{
				_id: planId,
			},
			{
				$set: update,
			}
		);

		res.status(200).json({
			status: "Sucess",
			data: plan,
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

const deletePlan = async (req, res) => {
	const { planId } = req.body;
	try {
		const checkValidity = await Plan.findOne({ _id: planId, user }).populate(
			"ward"
		);
		if (!checkValidity) {
			return res.status(400).json({
				status: "Failed",
				message: "You need to have created the plan",
			});
		}
		await Plan.deleteOne({ _id: planId });
		res.status(201).json({
			status: "Success",
			message: "Plan deleted successfully",
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

module.exports = {
	addPlan,
	getPlan,
	getPlansByWeek,
	editPlan,
	deletePlan,
};
