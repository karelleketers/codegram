import { handleHTTPError } from '../../utils';
import database from '../../db/models';

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
			user_id: profile.user_id,
			img_url: profile.img_url,
			subscription: profile.subscription,
			recent_activity: profile.recent_activity,
			createdAt: now,
			updatedAt: now,
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
}

export {
	getProfileById,
	getProfiles,
	createProfile,
};