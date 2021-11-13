import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Order.tableName, database.Order.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Order.tableName);
  }
};