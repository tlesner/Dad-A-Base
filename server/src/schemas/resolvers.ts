import { AuthenticationError } from 'apollo-server';
import User from '../models/User.js';
import { Video } from '../models/Video.js';
import { signToken } from '../utils/auth.js';

interface IUserContext {
	user: {
		username: string | null;
		email: string | null;
		_id: string | null;
	} | null;
}

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
		},
		addUser: async (
			_parent: unknown,
			// {
			// 	username,
			// 	email,
			// 	password,
			// }: { username: string; email: string; password: string }
			{ input }: AddUserInput
		) => {
			const { username, email, password } = input;
			const user = await User.create({ username, email, password });
			console.log('User: ', user);
			const token = signToken(user.username, user.email, user._id);
			console.log('Token: ', token);
			return { token, user };
		},

		saveVideo: async (
			_parent: any,
			{ video }: { video: any },
			context: IUserContext
		) => {
			console.log(context.user);
			if (context.user) {
				return await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { savedVideos: video } },
					{ new: true, runValidators: true }
				);
			}
			throw new AuthenticationError('Could not find user');
		},
		removeVideo: async (
			_parent: unknown,
			{ videoId }: { videoId: string },
			context: { user: any }
		) => {
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
	},
};

export default resolvers;
