import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all news
*/
const getNews = async (req, res, next) => {
	try {
		// Get news from database
		const news = await database.News.findAll();
		// Send response
		res.status(200).json(news);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific newsarticle
*/
const getNewsById = async (req, res, next) => {
	try {
		// Get newsId parameter
		const { newsId } = req.params;
		// Get specific news from database
		const news = await database.News.findOne({
			where: {
				id: newsId,
			},
		});
		// Send response
		res.status(200).json(news);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a news article
*/
const createNews = async (req, res, next) => {
	try {
		// Get the news data from the request body
		const { news } = req.body;
		const now = new Date();
		// Add id and date strings
		const newsToCreate = {
			id: uuidv4(),
			content: news.content,
			author_firstname: news.author_firstname,
			author_lastname: news.author_lastname,
			title: news.title,
			subtitle: news.subtitle,
			summary: news.summary,
			thumbnail: news.thumbnail,
			tags: news.tags
		};
		// Send response
		const response = await database.News.create(newsToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created news: ${JSON.stringify(news)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update news
*/
const updateNews = async (req, res, next) => {
	try {
		// Get the news data from the request body
		const { newsId } = req.params;
		const { content, author_firstname, author_lastname, title, subtitle, summary, thumbnail, tags } = req.body;

		const response = await database.News.update({ content, author_firstname, author_lastname, title, subtitle, summary, thumbnail, tags }, { where: {
			id: newsId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated news: ${newsId}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete newsletter
*/
const deleteNews = async (req, res, next) => {
	try {
		const { newsId } = req.params;
		const response = await database.News.destroy({
			where: { id: newsId}
		});
		res.status(204).send(`Deleted news with id ${newsId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getNews,
	getNewsById,
	createNews,
	updateNews,
	deleteNews,
};
