import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all videos
*/
const getVideos = async (req, res, next) => {
	try {
		// Get videos from database
		const videos = await database.Video.findAll();
		// Send response
		res.status(200).json(videos);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific video
*/
const getVideoById = async (req, res, next) => {
	try {
		// Get videoId parameter
		const { videoId } = req.params;
		// Get specific post from database
		const video = await database.Video.findAll({
			where: {
				id: videoId,
			},
		});
		// Send response
		res.status(200).json(video);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a video
*/
const createVideo = async (req, res, next) => {
	try {
		// Get the video data from the request body
		const { video } = req.body;
		const now = new Date();
		// Add id and date strings
		const videoToCreate = {
			id: uuidv4(),
			CourseId: video.CourseId,
			url: video.url,
			name: video.name,
			paused_at: video.paused_at,
			duration: video.duration,
		};
		// Send response
		const response = await database.Video.create(videoToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created video: ${JSON.stringify(video)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update video
*/
const updateVideo = async (req, res, next) => {
	try {
		// Get the video data from the request body
		const { videoId } = req.params;
		const { CourseId, url, name, paused_at, duration } = req.body;

		const response = await database.Video.update({ CourseId, url, name, paused_at, duration }, { where: {
			id: videoId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated video: ${videoId} | Complete: ${JSON.stringify(req.body)}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete video
*/
const deleteVideo = async (req, res, next) => {
	try {
		const { videoId } = req.params;
		const response = await database.Video.destroy({
			where: { id: videoId}
		});
		res.status(204).send(`Deleted video ${videoId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getVideoById,
	getVideos,
	createVideo,
	updateVideo,
	deleteVideo,
};
