<<<<<<< HEAD
import mongoose, { Schema, model, ObjectId, Document } from 'mongoose';
=======
import mongoose, { Schema, model, ObjectId } from 'mongoose';
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
import { BaseModel } from '../../../base/data/dtos/baseModel';

interface QuestionAnswer {
  question: string;
  answer: string;
}

<<<<<<< HEAD
export interface ApplicationModel extends Document {
=======
export interface ApplicationModel extends BaseModel {
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
  jobId: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  resume: string;
<<<<<<< HEAD
  resumeUrl?: string;
  coverLetter: string;
  questionAnswers: Array<{
    question: string;
    answer: string;
  }>;
  applicationDate: Date;
  notes?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationResponse extends Omit<ApplicationModel, keyof Document> {
  resumeSignedUrl?: string;
=======
  coverLetter: string;
  questionAnswers: QuestionAnswer[];
  applicationDate: Date;
  notes?: string;
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
}

const ApplicationSchema = new Schema<ApplicationModel>(
  {
    jobId: {
<<<<<<< HEAD
      type: Schema.Types.ObjectId,
=======
      type: mongoose.Schema.Types.ObjectId,
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
      ref: 'Job',
      required: true,
      index: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
      default: 'pending',
      required: true
    },
    resume: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    resumeUrl: {
      type: String
    },
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
    coverLetter: {
      type: String,
      required: true,
      maxlength: 1000
    },
    questionAnswers: [{
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }],
    applicationDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    notes: {
      type: String
    },
<<<<<<< HEAD
    isDeleted: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
=======
    isDeleted: { type: Boolean, default: false }
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
  },
  { timestamps: true }
);

export const ApplicationDto = model<ApplicationModel>('Application', ApplicationSchema); 