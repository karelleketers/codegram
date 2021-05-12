'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course_Videos.init({
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course_Videos',
  });
  return Course_Videos;
};