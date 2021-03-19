const fs = require('fs');

const db = require('../config/db.config.js');
const Bitcoin = db.Bitcoin;

const csv = require('fast-csv');
const Json2csvParser = require('json2csv').Parser;

exports.uploadFile = (req, res) => {
	try {
		const bitcoins = [];
		fs
			.createReadStream(__basedir + '/uploads/' + req.file.filename)
			.pipe(csv.parse({ headers: true }))
			.on('error', (error) => {
				console.error(error);
				throw error.message;
			})
			.on('data', (row) => {
				bitcoins.push(row);
				console.log(row);
			})
			.on('end', () => {
				// Save bitcoins to PostgreSQL database
				Bitcoin.bulkCreate(bitcoins).then(() => {
					const result = {
						status: 'ok',
						filename: req.file.originalname,
						message: 'Upload Successfully!'
					};

					res.json(result);
				});
			});
	} catch (error) {
		const result = {
			status: 'fail',
			filename: req.file.originalname,
			message: 'Upload Error! message = ' + error.message
		};
		res.json(result);
	}
};

/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
		try {
			// Parsing CSV Files to data array objects
			const csvParserStream = fs
				.createReadStream(__basedir + '/uploads/' + file.filename)
				.pipe(csv.parse({ headers: true }));

			var end = new Promise(function(resolve, reject) {
				let bitcoins = [];

				csvParserStream.on('data', (object) => {
					bitcoins.push(object);
					console.log(object);
				});
				csvParserStream.on('end', () => {
					resolve(bitcoins);
				});
				csvParserStream.on('error', (error) => {
					console.error(error);
					reject;
				}); // or something like that. might need to close `hash`
			});

			await (async function() {
				let bitcoins = await end;

				// save bitcoins to PostgreSQL database
				await Bitcoin.bulkCreate(bitcoins).then(() => {
					const result = {
						status: 'ok',
						filename: file.originalname,
						message: 'Upload Successfully!'
					};

					messages.push(result);
				});
			})();
		} catch (error) {
			console.log(error);

			const result = {
				status: 'fail',
				filename: file.originalname,
				message: 'Error -> ' + error.message
			};
			messages.push(result);
		}
	}

	return res.json(messages);
};

exports.downloadFile = (req, res) => {
	Bitcoin.findAll({
		attributes: [
			'date',
			'txVolume',
			'adjustedTxVolume',
			'txCount',
			'marketCap',
			'price',
			'exchangeVolume',
			'generatedCoins',
			'fees',
			'activeAddresses',
			'averageDifficulty',
			'paymentCount',
			'medianTxValue',
			'medianFee',
			'blockSize',
			'blockCount'
		]
	}).then((objects) => {
		const jsonBitcoins = JSON.parse(JSON.stringify(objects));
		const csvFields = [
			'date',
			'txVolume',
			'adjustedTxVolume',
			'txCount',
			'marketCap',
			'price',
			'exchangeVolume',
			'generatedCoins',
			'fees',
			'activeAddresses',
			'averageDifficulty',
			'paymentCount',
			'medianTxValue',
			'medianFee',
			'blockSize',
			'blockCount'
		];
		const json2csvParser = new Json2csvParser({ csvFields });
		const csvData = json2csvParser.parse(jsonBitcoins);

		res.setHeader('Content-disposition', 'attachment; filename=bitcoin_csv.csv');
		res.set('Content-Type', 'text/csv');
		res.status(200).end(csvData);
	});
};
