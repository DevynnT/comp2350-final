const express = require('express');
const mySql = require('mysql2/promise');

const router = require('./routes/router');
const database = require('./databaseConnection');

const app = express();
const PORT = process.env.PORT || 5050;

const printMySQLVersion = async () => {
	let sqlQuery = `
		SHOW VARIABLES LIKE 'version';
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log("Successfully connected to MySQL");
		console.log(results[0]);
		return true;
	}
	catch(err) {
		console.log("Error getting version from MySQL");
		return false;
	}
};

printMySQLVersion();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.use('/', router);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));