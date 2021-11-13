import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all promotions
*/
const getPromotions = async (req, res, next) => {
	try {
		// Get promotions from database
		const promotions = await database.Promotion.findAll();
		// Send response
		res.status(200).json(promotions);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific promotion
*/
const getPromotionById = async (req, res, next) => {
	try {
		// Get promotionId parameter
		const { promotionId } = req.params;
		// Get specific post from database
		const promotion = await database.Promotion.findAll({
			where: {
				id: promotionId,
			},
		});
		// Send response
		res.status(200).json(promotion);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a promotion
*/
const createPromotion = async (req, res, next) => {
	try {
		// Get the promotion data from the request body
		const { promotion } = req.body;
		const now = new Date();
		// Add id and date strings
		const promotionToCreate = {
			id: uuidv4(),
			CourseId: promotion.CourseId,
			SubscriptionId: promotion.SubscriptionId,
			price_modifier: promotion.price_modifier,
		};
		// Send response
		const response = await database.Promotion.create(promotionToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created promotion: ${JSON.stringify(promotion)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update promotion
*/
const updatePromotion = async (req, res, next) => {
	try {
		// Get the promotion data from the request body
		const { promotionId } = req.params;
		const { CourseId, SubscriptionId, price_modifier } = req.body;

		const response = await database.Promotion.update({ CourseId, SubscriptionId, price_modifier }, { where: {
			id: promotionId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated promotion: ${promotionId}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete promotion
*/
const deletePromotion = async (req, res, next) => {
	try {
		const { promotionId } = req.params;
		const response = await database.Promotion.destroy({
			where: { id: promotionId}
		});
		res.status(204).send(`Deleted promotion ${promotionId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getPromotionById,
	getPromotions,
	createPromotion,
	updatePromotion,
	deletePromotion,
};
