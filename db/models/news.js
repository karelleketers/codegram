import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class News extends Model {
		static associate(models) {
		}
	}

	News.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true},
    content: DataTypes.TEXT,
	author_firstname: DataTypes.TEXT,
    author_lastname: DataTypes.TEXT,
	title: DataTypes.TEXT,
    subtitle: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    tags: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
	}, {
		sequelize,
		modelName: 'News',
	});

	return News;
};