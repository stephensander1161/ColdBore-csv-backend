const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

const db = require('./app/models');
db.sequelize.sync().then(() => {
	console.log('Drop and re-sync db.');
});

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Hello from server.' });
});

require('./app/routes/bitcoin.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
