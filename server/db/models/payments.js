import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Payment extends Model {
		static associate(models) {
			this.belongsTo(models.Profile);
			this.belongsTo(models.Order);
		}
	}

	Payment.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    total: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'Payment',
	});

	return Payment;
};