import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all categories
*/
const getCategories = async (req, res, next) => {
	try {
		// Get categories from database
		const categories = await database.Category.findAll();
		// Send response
		res.status(200).json(categories);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific category by id
*/
const getCategoryById = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { categoryId } = req.params;
		// Get specific post from database
		const category = await database.Category.findAll({
			where: {
				id: categoryId,
			},
		});
		// Send response
		res.status(200).json(category);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific category by name
*/
const getCategoryByName = async (req, res, next) => {
	try {
		// Get categoryName parameter
		const { categoryName } = req.params;
		// Get specific post from database
		const category = await database.Category.findAll({
			where: {
				name: categoryName,
			},
		});
		// Send response
		res.status(200).json(category);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a category
*/
const createCategory = async (req, res, next) => {
	try {
		// Get the category data from the request body
		const { category } = req.body;
		const now = new Date();
		// Add id and date strings
		const categoryToCreate = {
			id: uuidv4(),
			name: category.name,
			description: category.description,
			//createdAt: now,
			//updatedAt: now,
		};
		// Send response
		const response = await database.Category.create(categoryToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created category: ${JSON.stringify(category)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
}

/*
Update category
*/
const updateCategory = async (req, res, next) => {
	try {
		// Get the category data from the request body
		const { categoryName } = req.params;
		const { name, description } = req.body;

		const response = await database.Category.update({ name, description }, { where: {
			name: categoryName
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated category: ${name} - ${description}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
}

/*
Delete category
*/
const deleteCategory = async (req, res, next) => {
	try {
		const { categoryName } = req.params;
		const response = await database.Category.destroy({
			where: { name: categoryName}
		});
		res.status(204).send(`Deleted category ${categoryName}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
}


export {
	getCategoryByName,
	getCategoryById,
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory
};
