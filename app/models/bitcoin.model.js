module.exports = (sequelize, Sequelize) => {
	const Bitcoin = sequelize.define('bitcoin', {
		date: {
			type: Sequelize.STRING
		},
		txVolume: {
			type: Sequelize.DOUBLE
		},
		adjustedTxVolume: {
			type: Sequelize.DOUBLE
		},
		txCount: {
			type: Sequelize.DOUBLE
		},
		marketCap: {
			type: Sequelize.DOUBLE
		},
		price: {
			type: Sequelize.DOUBLE
		},
		exchangeVolume: {
			type: Sequelize.DOUBLE
		},
		generatedCoins: {
			type: Sequelize.DOUBLE
		},
		fees: {
			type: Sequelize.DOUBLE
		},
		activeAddresses: {
			type: Sequelize.DOUBLE
		},
		averageDifficulty: {
			type: Sequelize.DOUBLE
		},
		paymentCount: {
			type: Sequelize.DOUBLE
		},
		medianTxValue: {
			type: Sequelize.DOUBLE
		},
		medianFee: {
			type: Sequelize.DOUBLE
		},
		blockSize: {
			type: Sequelize.DOUBLE
		},
		blockCount: {
			type: Sequelize.DOUBLE
		}
	});

	return Bitcoin;
};
