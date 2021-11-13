import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Promotion extends Model {
		static associate(models) {
			this.belongsToMany(models.Order, {
				through: 'Promotion_Order',
			});
			this.belongsToMany(models.Subscription, {
				through: 'Promotion_Subscription',
			});
		}
	}

	Promotion.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    price_modifier: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Promotion',
	});

	return Promotion;
};
