import { handleHTTPError } from '../../utils';
import database from '../../db';
import { v4 as uuidv4 } from 'uuid';

/*
Get all profiles
*/
const getProfiles = async (req, res, next) => {
	try {
		// Get profiles from database
		const profiles = await database.Profile.findAll();
		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile
*/
const getProfileById = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific post from database
		const profile = await database.Profile.findAll({
			where: {
				id: profileId,
			},
		});
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile by User ID
*/
const getProfileByUserId = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { userId } = req.params;
		// Get specific post from database
		const profile = await database.Profile.findAll({
			where: {
				UserId: userId,
			},
		});
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a profile
*/
const createProfile = async (req, res, next) => {
	try {
		// Get the profile data from the request body
		const { profile } = req.body;
		const now = new Date();
		// Add id and date strings
		const profileToCreate = {
			id: uuidv4(),
			dob: profile.dob,
			UserId: profile.user_id,
			img_url: profile.img_url,
			subscription: profile.subscription,
			recent_activity: profile.recent_activity,
		};
		// Send response
		const response = await database.Profile.create(profileToCreate);
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(201).send(`Created profile: ${JSON.stringify(profile)}`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update profile
*/
const updateProfile = async (req, res, next) => {
	try {
		// Get the profile data from the request body
		const { profileId } = req.params;
		const { dob, img_url, subscription, recent_activity } = req.body;

		const response = await database.Profile.update({ dob, img_url, subscription, recent_activity }, { where: {
			id: profileId
		}});
		if (response && response.message) {
			res.status(500).send(`Failed: ${response.message}`)
		} else {
			res.status(200).send(`Updated profile: ${profileId}!`)
		}
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete profile
*/
const deleteProfile = async (req, res, next) => {
	try {
		const { profileId } = req.params;
		const response = await database.Profile.destroy({
			where: { id: profileId}
		});
		res.status(204).send(`Deleted profile ${profileId}!`);
	} catch (err) {
		handleHTTPError(err, next);
	}
};

export {
	getProfileById,
	getProfileByUserId,
	getProfiles,
	createProfile,
	updateProfile,
	deleteProfile,
};
