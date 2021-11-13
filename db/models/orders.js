import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
			this.belongsTo(models.Profile);
			this.hasMany(models.Promotion);
			this.hasOne(models.Payment);
			this.belongsToMany(models.Course, {
				through: 'Order_Courses'
			})
		}
	}

	Order.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    order_completed: DataTypes.BOOLEAN,
    total: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Order',
	});

	return Order;
};