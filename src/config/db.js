require("dotenv").config();
const mongoose = require("mongoose");
const DB_URL =
	process.env.DB_URL ||
	"mongodb+srv://bugtracker:bugtracker@cluster0.nw4ro3u.mongodb.net/Growcalculator";
const connect = async () => {
	console.log();
	client = await mongoose.connect(DB_URL);
	return client;
};

module.exports = connect;
