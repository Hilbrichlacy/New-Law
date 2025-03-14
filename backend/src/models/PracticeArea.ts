import mongoose from 'mongoose';

export interface IPracticeArea extends mongoose.Document {
  title: string;
  description: string;
  slug: string;
  image: string;
  expertise: string[];
  teamMembers: mongoose.Types.ObjectId[];
  caseStudies: {
    title: string;
    description: string;
    outcome: string;
  }[];
}

const practiceAreaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
  },
  expertise: [{
    type: String,
    trim: true,
  }],
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  caseStudies: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.model<IPracticeArea>('PracticeArea', practiceAreaSchema); 