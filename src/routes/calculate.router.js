const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const app = express.Router();

app.post("/", async (req, res) => {
	const { annualInstalmentAmount, annualInterestRate, totalNumberofYears } =
		req.body;
	// P [({(1+i) ^n}-1)/i]
	const p = Number(annualInstalmentAmount);
	let i = Number(annualInterestRate / 100);
	let n = Number(totalNumberofYears);
	console.log(p, i, n);
	const totalMaturityValue = p * ((((1 + i) ^ n) - 1) / i);
	const totalInvestmentAmount = annualInstalmentAmount * totalNumberofYears;
	const totalInterestGained = totalMaturityValue - totalInvestmentAmount;

	return res.status(200).send({
		totalMaturityValue: totalMaturityValue,
		totalInvestmentAmount: totalInvestmentAmount,
		totalInterestGained: totalInterestGained,
	});
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });
	if (user && (await compareBcryptPassword(password, user.password))) {
		return res.status(200).send({
			message: "Login Success",
			email: user.email,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

module.exports = app;
