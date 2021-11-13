import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReviews extends Model {
		static associate(models) {
			this.belongsTo(models.Profile);
			this.belongsTo(models.Course);
		}
	}

	ProductReviews.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    stars: DataTypes.INTEGER,
    review: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'ProductReviews',
	});

	return ProductReviews;
};
