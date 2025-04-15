import { AuthenticationError } from 'apollo-server';
import User from '../models/User.js';
import { Video } from '../models/Video.js';
import { signToken } from '../utils/auth.js';

interface IUserContext {
	user: {
		_id: string | null;
		username: string | null;
		email: string | null;
	} | null;
}

// interface LoginArgs {
// 	email: string;
// 	password: string;
// }

// interface RegisterArgs {
//   username: string;
//   email: string;
//   password: string;
// }

// interface SaveVideoArgs {
// 	videoData: {
// 		videoId: string;
// 		creator: string;
// 		description: string;
// 		title: string;
// 		image?: string;
// 		link?: string;
// 	};
// }

// interface RemoveVideoArgs {
// 	videoId: string;
// }

interface AddUserInput {
	input: {
		username: string;
		email: string;
		password: string;
	};
}

const resolvers = {
	Query: {
		me: async (_parent: any, _args: any, context: any) => {
			if (context.user) {
				console.log(context.user);
				return await User.findOne({ _id: context.user._id }).populate(
					'savedVideos'
				);
			}
			throw new AuthenticationError('Not Authenticated');
			// if (!context.user || !context.user._id) {
			// 	console.error(
			// 		'Authentication failed: No user found in context'
			// 	);
			// 	throw new AuthenticationError('Not authenticated');
			// }
			// try {
			// 	return await User.findById(context.user._id).populate(
			// 		'savedVideos'
			// 	);
			// } catch (error) {
			// 	console.error('Failed to fetch user data:', error);
			// 	throw new Error('Failed to retrieve user information');
			// }
		},
		videos: async () => {
			return await Video.find();
		},
	},

	Mutation: {
		login: async (
			_parent: any,
			{ email, password }: { email: string; password: string }
		) => {
			const user = await User.findOne({ email });
			if (!user || !(await user.isCorrectPassword(password))) {
				throw new AuthenticationError('User or password incorrect');
			}
			const token = signToken(user.username, user.email, user._id);
			return { token, user };
			// try {
			// 	const user = await User.findOne({ email });
			// 	if (!user || !(await user.isCorrectPassword(password))) {
			// 		console.warn('Login failed for email:', email);
			// 		throw new AuthenticationError('Invalid email or password');
			// 	}
			// 	const token = signToken(user.username, user.email, user._id);
			// 	return { token, user };
			// } catch (error) {
			// 	console.error('Login error:', error);
			// 	throw new Error('Login failed');
			// }
		},

		addUser: async (_parent: any, { input }: AddUserInput) => {
			// try {
			//   const { username, email, password } = input;
			//   const existing = await User.findOne({ email });
			//           if (existing) {
			//     console.warn("Registration attempt with existing email:", email);
			//     throw new AuthenticationError("Email is already in use");
			//   }

			//   const user = await User.create({ username, email, password });
			//   const token = signToken(user.username, user.email, user._id);
			//   return { token, user };
			// } catch (error) {
			//   console.error("Registration error:", error);
			//   throw new Error("User registration failed");
			// }
			const { username, email, password } = input;
			const user = await User.create({ username, email, password });
			console.log('User: ', user);
			const token = signToken(user.username, user.email, user._id);
			console.log('Token: ', token);
			return { token, user };
		},
	},

	saveVideo: async (
		// _parent: any,
		// { videoData }: SaveVideoArgs,
		// context: IUserContext
		_parent: any,
		{ video }: { video: any },
		context: IUserContext
	) => {
		// if (!context.user || !context.user._id) {
		// 	console.error('Save video failed: unauthenticated request');
		// 	throw new AuthenticationError(
		// 		'You must be logged in to save videos'
		// 	);}
		console.log(context.user);
		if (context.user) {
			return await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $push: { savedVideos: video } },
				{ new: true, runValidators: true }
			);
		}
		throw new AuthenticationError('Could not find user');
		// try {
		// 	const updatedUser = await User.findByIdAndUpdate(
		// 		context.user._id,
		// 		{ $addToSet: { savedVideos: videoData } },
		// 		{ new: true, runValidators: true }
		// 	);
		// 	return updatedUser;
		// } catch (error) {
		// 	console.error('Error saving video:', error);
		// 	throw new Error('Failed to save video');
		// }
	},

	removeVideo: async (
		_parent: unknown,
		{ videoId }: { videoId: string },
		context: { user: any }
	) => {
		// if (!context.user || !context.user._id) {
		// 	console.error('Remove video failed: unauthenticated request');
		// 	throw new AuthenticationError(
		// 		'You must be logged in to remove videos'
		// 	);
		// }
		// try {
		// 	const updatedUser = await User.findByIdAndUpdate(
		// 		context.user._id,
		// 		{ $pull: { savedVideos: { videoId } } },
		// 		{ new: true }
		// 	);
		// 	return updatedUser;
		// } catch (error) {
		// 	console.error('Error removing video:', error);
		// 	throw new Error('Failed to remove video');
		// }
		if (context.user) {
			return await User.findOneAndUpdate(
				{ _id: context.user._id },
				{
					$pull: { savedVideos: { videoId } },
				},
				{ new: true }
			);
		}
		throw new AuthenticationError('Could not find user');
	},
};

export default resolvers;
