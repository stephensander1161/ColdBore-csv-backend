module.exports = {
	HOST: process.env.HOST,
	USER: process.env.USER,
	PASSWORD: process.env.PASSWORD,
	DB: process.env.DB,
	dialect: 'postgres',
	protocol: 'SSL',
	port: 5432,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
