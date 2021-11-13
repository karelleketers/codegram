import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Subscription extends Model {
		static associate(models) {
			this.belongsToMany(models.Profile, {
				through: 'Profile_Subscription',
			});
			this.hasMany(models.Promotion);
		}
	}

	Subscription.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    subscription_type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Subscription',
	});

	return Subscription;
};