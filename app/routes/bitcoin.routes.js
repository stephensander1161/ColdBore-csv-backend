module.exports = (app) => {
	const bitcoins = require('../controllers/bitcoin.controller.js');
	let upload = require('../config/multer.config.js');

	var router = require('express').Router();

	const csvWorker = require('../controllers/csv.controller.js');

	let path = __basedir + '/views/';

	app.use('/api/bitcoins', router);

	//parsing csv's

	router.get('/csv', (req, res) => {
		console.log('__basedir' + __basedir);
		res.sendFile(path + 'index.html');
	});

	//This is the route I'm trying to make work
	router.post('/file/upload', upload.any('file'), csvWorker.uploadFile);

	router.get('/file/download', csvWorker.downloadFile);

	router.post('/file/multiple/upload', upload.array('files', 4), csvWorker.uploadMultipleFiles);

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
};
