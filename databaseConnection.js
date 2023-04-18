const mySql = require('mysql2/promise');

const isQoddi = process.env.IS_QODDI || false;

const dbConfigLocal = {
    host: "localhost",
	user: "root",
	password: "cool123",
	database: "final",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigQoddi = {
    host: "sql.freedb.tech",
	user: "freedb_hello",
	password: "6nA&2tNK!XbnVGz",
	database: "freedb_comp2350-week3-A01223968",
	multipleStatements: false,
	namedPlaceholders: true,
};

let database;

if (isQoddi) {
    database = mySql.createPool(dbConfigQoddi);
} else {
    database = mySql.createPool(dbConfigLocal);
}

module.exports = database;