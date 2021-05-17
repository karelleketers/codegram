import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class CourseVideos extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	CourseVideos.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true},
    course_id: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'CourseVideos',
	});

	return CourseVideos;
};