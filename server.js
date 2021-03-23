const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var corsOptions = {
	origin: 'http://localhost:8081'
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Hello from server.' });
});

require('./app/routes/bitcoin.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

io.on('connection', (socket) => {
	console.log('Client connected');
	dataUpdate(socket);
});

function dataUpdate(socket) {
	socket.emit('dataupdate', Array.from({ length: 8 }, () => Math.floor(Math.random() * 40)));

	setTimeout(() => {
		dataUpdate(socket);
	}, 2000);
}

const db = require('./app/models');
db.sequelize.sync().then(() => {
	console.log('Re-sync db.');
});
