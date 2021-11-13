import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.User.tableName, database.User.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.User.tableName);
  }
};