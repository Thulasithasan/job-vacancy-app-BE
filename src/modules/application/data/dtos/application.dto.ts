import mongoose, { Schema, model, ObjectId, Document } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface ApplicationModel extends Document {
  jobId: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  resume: string;
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
}

const ApplicationSchema = new Schema<ApplicationModel>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
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
    resumeUrl: {
      type: String
    },
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
    isDeleted: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const ApplicationDto = model<ApplicationModel>('Application', ApplicationSchema); 