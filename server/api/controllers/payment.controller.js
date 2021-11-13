import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all payments
*/
const getPayments = async (req, res, next) => {
	try {
		// Get payments from database
		const payments = await database.Payment.findAll();
		// Send response
		res.status(200).json(payments);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific payment
*/
const getPaymentById = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific post from database
		const payment = await database.Payment.findAll({
			where: {
				id: paymentId,
			},
		});
		// Send response
		res.status(200).json(payment);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a payment
*/
const createPayment = async (req, res, next) => {
	try {
		// Get the payment data from the request body
		const { payment } = req.body;
		const now = new Date();
		// Add id and date strings
		const paymentToCreate = {
			id: uuidv4(),
			UserId: payment.UserId,
			OrderId: payment.OrderId,
			total: payment.total,
		};
		// Send response
		const response = await database.Payment.create(paymentToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created payment: ${JSON.stringify(payment)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update payment
*/
const updatePayment = async (req, res, next) => {
	try {
		// Get the payment data from the request body
		const { paymentId } = req.params;
		const { total } = req.body;

		const response = await database.Payment.update({ total }, { where: {
			id: paymentId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated payment: ${paymentId}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete payment
*/
const deletePayment = async (req, res, next) => {
	try {
		const { paymentId } = req.params;
		const response = await database.Payment.destroy({
			where: { id: paymentId}
		});
		res.status(204).send(`Deleted payment ${paymentId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getPaymentById,
	getPayments,
	createPayment,
	updatePayment,
	deletePayment,
};
