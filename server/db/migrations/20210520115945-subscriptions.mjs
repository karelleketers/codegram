import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Subscription.tableName, database.Subscription.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Subscription.tableName);
  }
};