import cors from 'cors';
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './api/middleware';

/*
Custom modules
*/
import { EnvironmentVariables } from './db/config/index.js';
import apiRoutes from './api/routes';
import publicRoutes from './routes';
import authenticate from './utils/auth.js';

/*
Database
*/
import logger from './utils/logger.js';
import database from './db';

(async () => {
	database.connect();
})()

/*
Create Express app
*/
const app = express();

/*
View Engine
*/
nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true,
});
app.set('view engine', 'html');

/*
bodyParser
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
Cors options
*/
const corsOptions = {
	origin: 'localhost:8080',
	optionSuccessStatus: 200
}
/*
API Routes
*/
app.use('/api', cors(corsOptions), apiRoutes);
app.use('/auth', authenticate);
app.use('/', publicRoutes);
app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * Swagger - JSDoc set-up
 */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/*
Start the server
Listen to incoming requests
*/
let server;
if (EnvironmentVariables.NODE_ENV !== 'test') {
	server = app.listen(EnvironmentVariables.PORT, EnvironmentVariables.HOSTNAME, (err) => {
		if (err) {
			throw err;
		};
		if (EnvironmentVariables.NODE_ENV === 'development') {
			logger.info(`Server is listening at http://${EnvironmentVariables.HOSTNAME}:${EnvironmentVariables.PORT}!`);
		}
	});
}

/*
Handle shutdown gracefully
*/
const handleGracefully = async () => {
	try {
		await server.close(async (err) => {
			if (err) throw err;

			if (EnvironmentVariables.NODE_ENV === 'development') {
				logger.info('Server is gracefully closed!');
			}
			process.exit(0);
		});
	} catch (ex) {
		logger.error(`Error: ${ex.message}.`)
	}
};

/*
Shutdown the application
*/
process.on('SIGINT', () => {
	handleGracefully();
});
process.on('SIGTERM', () => {
	handleGracefully();
});

export {
	app,
	server,
	handleGracefully
};