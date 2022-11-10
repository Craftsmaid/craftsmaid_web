const User = require("../models/user.model");
const Ward = require("../models/ward.model");
const School = require("../models/school.model");

// create ward
const addWard = async (req, res) => {
	const { name, school, parent } = req.body;
	try {
		// check if parent exists
		const checkParent = await User.findById(parent);
		// check if school exists
		const checkSchool = await School.findById(school);
		if (!checkParent) {
			return res.status(404).json({
				status: "Failed",
				message: "Parent account not found",
			});
		}

		if (!checkSchool) {
			return res.status(404).json({
				status: "Failed",
				message: "School account not found",
			});
		}

		const ward = new Ward({
			name,
			school,
			class: req.body.class,
			parent,
		});
		await ward.save();
		checkParent.wards.push(ward._id);
		await checkParent.save();
		res.status(200).json({ ward });
	} catch (err) {
		res.status(401).json({ error: err });
	}
};

const getWard = async (req, res) => {
	const { wardId } = req.body;
	try {
		const ward = await Ward.findById(wardId).populate("school");
		if (!ward) {
			return res.status(404).json({
				message: `Ward with ID ${wardId} not found`,
			});
		}
		res.status(200).json({ ward });
	} catch (err) {
		res.status(401).json({ error: err });
	}
};

const getWards = async (req, res) => {
	const { parent } = req.body;
	try {
		const wards = await Ward.find({ parent }).populate("school");
		res.status(200).json({ wards });
	} catch (err) {
		res.status(400).json({
			error: err,
		});
	}
};

const editWard = async (req, res) => {
	const { wardId, update } = req.body;
	try {
		await Ward.updateOne(
			{ _id: wardId },
			{
				$set: update,
			}
		);

		res.status(200).json({ message: "successful" });
	} catch (err) {
		res.status(400).json({
			error: err,
		});
	}
};

const deleteWard = async (req, res) => {
	const { wardId } = req.body;
	try {
		const ward = await Ward.findById(wardId);
		const parent = await User.findById(ward.parent);

		parent.wards.filter((item) => item !== wardId);
		await parent.save();
		await Ward.deleteOne({ _id: wardId });
		res.status(201).json({
			status: "Successful",
			message: "Deleted Successfully",
		});
	} catch (err) {
		res.status(400).json({
			error: err,
		});
	}
};

module.exports = {
	addWard,
	getWard,
	getWards,
	editWard,
	deleteWard
};