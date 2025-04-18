// import dotenv from 'dotenv';
// dotenv.config();

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || '';

// const db = async (): Promise<typeof mongoose.connection> => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('Database connected.');
//     return mongoose.connection;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw new Error('Database connection failed.');
//   }
// };

// export default db;

import mongoose from 'mongoose';

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://tjlesner:B8gvEj90k0fZyspc@cluster0.n2ae8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/dad-a-base'
);

const db = mongoose.connection;

export default db;
