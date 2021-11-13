import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Newsletter.tableName, database.Newsletter.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Newsletter.tableName);
  }
};
