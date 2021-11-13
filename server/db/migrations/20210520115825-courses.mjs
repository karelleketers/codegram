import 'babel-polyfill';

import database from '../index.js';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Course.tableName, database.Course.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Course.tableName);
  }
};
