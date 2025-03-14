import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  title: string;
  description: string;
  type: 'conference' | 'webinar' | 'seminar' | 'workshop';
  date: Date;
  location: {
    type: 'virtual' | 'physical';
    address?: string;
    link?: string;
  };
  image: string;
  speakers: {
    name: string;
    title: string;
    bio: string;
  }[];
  registrationLink: string;
  capacity: number;
  registeredAttendees: mongoose.Types.ObjectId[];
}

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['conference', 'webinar', 'seminar', 'workshop'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['virtual', 'physical'],
      required: true,
    },
    address: String,
    link: String,
  },
  image: {
    type: String,
    required: true,
  },
  speakers: [{
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: String,
  }],
  registrationLink: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  registeredAttendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export default mongoose.model<IEvent>('Event', eventSchema); 