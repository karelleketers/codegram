'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Videos.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    course_id: DataTypes.STRING,
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    paused_at: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Videos',
  });
  return Videos;
};