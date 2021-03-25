const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

let x = true;
global.__basedir = __dirname;

const db = require('./app/models');
db.sequelize.sync().then(() => {
	console.log('Re-sync db.');
});

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Hello from server.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: [ 'GET', 'POST' ]
	}
});

io.sockets.on('connection', (socket) => {
	console.log(`new connection id: ${socket.id}`);
	sendData(socket);
});

const bitcoins = require('./app/controllers/bitcoin.controller.js');
var router = require('express').Router();

app.use('/api/bitcoins', router);

function sendData(socket) {
	if (x) {
		socket.emit('data1', Array.from(router.get('/', bitcoins.findAll)));
		x = !x;
	} else {
		socket.emit('data2', Array.from(router.get('/', bitcoins.findAll)));
		x = !x;
	}
	console.log(`data is ${x}`);
	setTimeout(() => {
		sendData(socket);
	}, 1000);
}

require('./app/routes/bitcoin.routes')(app);
