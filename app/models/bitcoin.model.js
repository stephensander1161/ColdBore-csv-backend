module.exports = (sequelize, Sequelize) => {
	const Bitcoin = sequelize.define(
		'bitcoin',
		{
			date: {
				type: Sequelize.STRING
			},
			txvolume: {
				type: Sequelize.INTEGER
			},
			adjustedtxvolume: {
				type: Sequelize.INTEGER
			},
			txcount: {
				type: Sequelize.INTEGER
			},
			marketcap: {
				type: Sequelize.INTEGER
			},
			price: {
				type: Sequelize.INTEGER
			},
			exchangevolume: {
				type: Sequelize.INTEGER
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
				type: Sequelize.INTEGER
			},
			mediantxvalue: {
				type: Sequelize.INTEGER
			},
			medianfee: {
				type: Sequelize.INTEGER
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
