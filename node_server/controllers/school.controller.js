const School = require("./../models/school.model");

const addSchool = async (req, res) => {
	const { name, location } = req.body;
	try {
		const school = new School({
			name,
			location,
		});

		await school.save();
		res.status(201).json({school});
	} catch (err) {
		res.status(401).json({ error: err });
	}
};

module.exports = {
	addSchool,
};
