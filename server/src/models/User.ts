import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { videoSchema } from './Video.js';
import type { VideoDocument } from './Video.js';

// Define an interface for the User document
export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  savedVideos: VideoDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  videoCount: number;
}

// Define the schema for the User document
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedVideos: [videoSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true 
    },
    toObject: { 
      getters: true 
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('videoCount').get(function () {
  return this.savedVideos.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
