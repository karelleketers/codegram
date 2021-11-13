import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all newsletters
*/
const getNewsletters = async (req, res, next) => {
	try {
		// Get newsletters from database
		const newsletters = await database.Newsletter.findAll();
		// Send response
		res.status(200).json(newsletters);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific newsletter
*/
const getNewsletterById = async (req, res, next) => {
	try {
		// Get newsletterId parameter
		const { newsletterId } = req.params;
		// Get specific post from database
		const newsletter = await database.Newsletter.findAll({
			where: {
				id: newsletterId,
			},
		});
		// Send response
		res.status(200).json(newsletter);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a newsletter
*/
const createNewsletter = async (req, res, next) => {
	try {
		// Get the newsletter data from the request body
		const { newsletter } = req.body;
		const now = new Date();
		// Add id and date strings
		const newsletterToCreate = {
			id: uuidv4(),
			UserId: newsletter.UserId,
			content: newsletter.content,
		};
		// Send response
		const response = await database.Newsletter.create(newsletterToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created newsletter: ${JSON.stringify(newsletter)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update newsletter
*/
const updateNewsletter = async (req, res, next) => {
	try {
		// Get the newsletter data from the request body
		const { newsletterId } = req.params;
		const { content } = req.body;

		const response = await database.Newsletter.update({ content }, { where: {
			id: newsletterId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated newsletter: ${newsletterId}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete newsletter
*/
const deleteNewsletter = async (req, res, next) => {
	try {
		const { newsletterId } = req.params;
		const response = await database.Newsletter.destroy({
			where: { id: newsletterId}
		});
		res.status(204).send(`Deleted newsletter with id ${newsletterId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getNewsletterById,
	getNewsletters,
	createNewsletter,
	updateNewsletter,
	deleteNewsletter,
};
