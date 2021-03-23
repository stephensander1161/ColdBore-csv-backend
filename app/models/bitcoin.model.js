module.exports = (sequelize, Sequelize) => {
	const Bitcoin = sequelize.define(
		'bitcoin',
		{
			date: {
				type: Sequelize.STRING
			},
			txvolume_usd: {
				type: Sequelize.DOUBLE
			},
			adjustedtxvolume_usd: {
				type: Sequelize.DOUBLE
			},
			txcount: {
				type: Sequelize.INTEGER
			},
			marketcap_usd: {
				type: Sequelize.DOUBLE
			},
			price_usd: {
				type: Sequelize.DOUBLE
			},
			exchangevolume_usd: {
				type: Sequelize.DOUBLE
			},
			generatedcoins: {
				type: Sequelize.DOUBLE
			},
			fees: {
				type: Sequelize.DOUBLE
			},
			activeaddresses: {
				type: Sequelize.INTEGER
			},
			averagedifficulty: {
				type: Sequelize.DOUBLE
			},
			paymentcount: {
				type: Sequelize.DOUBLE
			},
			mediantxvalue_usd: {
				type: Sequelize.DOUBLE
			},
			medianfee: {
				type: Sequelize.DOUBLE
			},
			blocksize: {
				type: Sequelize.INTEGER
			},
			blockcount: {
				type: Sequelize.INTEGER
			}
		},
		{ timestamps: false }
	);

	Bitcoin.removeAttribute('id');

	return Bitcoin;
};
