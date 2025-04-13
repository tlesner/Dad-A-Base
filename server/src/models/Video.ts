import { Schema, model, type Document } from 'mongoose';

export interface VideoDocument extends Document {
  videoId: string;
  creator: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const videoSchema = new Schema<VideoDocument>({
  creator: {    
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  videoId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
},
{
  toJSON: {
    virtuals: true,
  },
});

const Video = model<VideoDocument>('Video', videoSchema);

export { Video , videoSchema };
