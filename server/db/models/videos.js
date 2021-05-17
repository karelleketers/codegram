import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Video extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	Video.init({
    course_id: DataTypes.STRING,
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    paused_at: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Video',
	});

	return Video;
};