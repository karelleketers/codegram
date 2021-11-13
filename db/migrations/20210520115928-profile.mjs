import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Profile.tableName, database.Profile.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Profile.tableName);
  }
};