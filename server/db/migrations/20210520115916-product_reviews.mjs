import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.ProductReviews.tableName, database.ProductReviews.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.ProductReviews.tableName);
  }
};