import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Payment.tableName, database.Payment.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Payment.tableName);
  }
};