module.exports = (app) => {
	const bitcoins = require('../controllers/bitcoin.controller.js');

	var router = require('express').Router();

	// Create a new Bitcoin entry
	router.post('/', bitcoins.create);

	// Retrieve all Bitcoin entry
	router.get('/', bitcoins.findAll);

	// Retrieve a single Bitcoin entry with id
	router.get('/:id', bitcoins.findOne);

	// Update a Bitcoin entry with id
	router.put('/:id', bitcoins.update);

	// Delete a Bitcoin entry with id
	router.delete('/:id', bitcoins.delete);

	// Create a new Bitcoin entry
	router.delete('/', bitcoins.deleteAll);

	app.use('/api/bitcoins', router);
};
