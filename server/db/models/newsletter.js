import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Newsletter extends Model {
		static associate(models) {
			this.belongsToMany(models.User, {
				through: 'Newsletter_Users',
			});
		}
	}

	Newsletter.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Newsletter',
	});

	return Newsletter;
};