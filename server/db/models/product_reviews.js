import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReviews extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	ProductReviews.init({
    id: DataTypes.UUID,
    user_id: DataTypes.STRING,
    course_id: DataTypes.STRING,
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
