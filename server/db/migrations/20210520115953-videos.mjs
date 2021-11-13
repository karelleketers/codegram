import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Video.tableName, database.Video.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Video.tableName);
  }
};