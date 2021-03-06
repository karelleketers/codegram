import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Webshop API for Codegram',
		version: '1.0.0',
	},
	servers: [
		{
			url: '/',
			description: 'Development server',
		},
	],
};

const swaggerOptions = {
	swaggerDefinition,
	apis: ['./server/api/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;