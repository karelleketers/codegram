import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all subscriptions
*/
const getSubscriptions = async (req, res, next) => {
	try {
		// Get subscriptions from database
		const subscriptions = await database.Subscription.findAll();
		// Send response
		res.status(200).json(subscriptions);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific subscription
*/
const getSubscriptionById = async (req, res, next) => {
	try {
		// Get subscriptionId parameter
		const { subscriptionId } = req.params;
		// Get specific post from database
		const subscription = await database.Subscription.findAll({
			where: {
				id: subscriptionId,
			},
		});
		// Send response
		res.status(200).json(subscription);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a subscription
*/
const createSubscription = async (req, res, next) => {
	try {
		// Get the subscription data from the request body
		const { subscription } = req.body;
		const now = new Date();
		// Add id and date strings
		const subscriptionToCreate = {
			id: uuidv4(),
			ProfileId: subscription.ProfileId,
      start_date: subscription.start_date,
      end_date: subscription.end_date,
      price: subscription.price,
      subscription_type: subscription.subscription_type,
		};
		// Send response
		const response = await database.Subscription.create(subscriptionToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created subscription: ${JSON.stringify(subscription)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update subscription
*/
const updateSubscription = async (req, res, next) => {
	try {
		// Get the subscription data from the request body
		const { subscriptionId } = req.params;
		const { start_date, end_date, price, subscription_type } = req.body;

		const response = await database.Subscription.update({ start_date, end_date, price, subscription_type }, { where: {
			id: subscriptionId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated subscription: ${subscriptionId} | ${JSON.stringify(req.body)}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete subscription
*/
const deleteSubscription = async (req, res, next) => {
	try {
		const { subscriptionId } = req.params;
		const response = await database.Subscription.destroy({
			where: { id: subscriptionId}
		});
		res.status(204).send(`Deleted subscription ${subscriptionId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getSubscriptionById,
	getSubscriptions,
	createSubscription,
	updateSubscription,
	deleteSubscription,
};
