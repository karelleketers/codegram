import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
      this.hasOne(models.Profile);
			// this.hasMany(models.Course);
      this.hasOne(models.Newsletter);
      this.belongsToMany(models.Course, {
        through: 'User_Courses'
      })
		}
	}

	User.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    last_login: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'User',
	});

	return User;
};