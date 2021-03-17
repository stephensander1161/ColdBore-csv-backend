const db = require('../models');
const Bitcoin = db.bitcoin;
const Op = db.Sequelize.Op;

// Create and Save a new Bitcoin
exports.create = (req, res) => {
	// Validate request
	if (!req.body.date) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
		return;
	}

	// Create a Bitcoin
	const bitcoin = {
		date: req.body.date,
		txVolume: req.body.txVolume,
		adjustedTxVolume: req.body.adjustedTxVolume,
		txCount: req.body.txCount,
		marketCap: req.body.marketCap,
		price: req.body.price,
		exchangeVolume: req.body.exchangeVolume,
		generatedCoins: req.body.generatedCoins,
		fees: req.body.fees,
		activeAddresses: req.body.activeAddresses,
		averageDifficulty: req.body.averageDifficulty,
		paymentCount: req.body.paymentCount,
		medianTxValue: req.body.medianTxValue,
		medianFee: req.body.medianFee,
		blockSize: req.body.blockSize,
		blockCount: req.body.blockCount
	};

	// Save Bitcoin in the database
	Bitcoin.create(bitcoin)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Bitcoin entry.'
			});
		});
};

exports.findAll = (req, res) => {
	const date = req.query.date;
	var condition = date ? { date: { [Op.iLike]: `%${date}%` } } : null;

	Bitcoin.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving bitcoin entries.'
			});
		});
};

// Find a single Bitcoin entry with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Bitcoin.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving bitcoin entry with id=' + id
			});
		});
};
// Update a Bitcoin entry by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Bitcoin.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 2) {
				res.send({
					message: 'Bitcoin entry was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Bitcoin entry with id=${id}. Maybe it was not found or the body is empty!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Bitcoin entry with id=' + id
			});
		});
};
// Delete a Bitcoin entry with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Bitcoin.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Bitcoin entry was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Bitcoin entry with id=${id}. Maybe it was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Bitcoin entry with id=' + id
			});
		});
};
// Delete all Bitcoin entries from the database.
exports.deleteAll = (req, res) => {
	Bitcoin.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Bitcoin entries were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all bitcoin entries.'
			});
		});
};
