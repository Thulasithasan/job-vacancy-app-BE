import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface ApplicationModel extends BaseModel {
  jobId: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  resume: string;
  coverLetter: string;
  questionAnswers: QuestionAnswer[];
  applicationDate: Date;
  notes?: string;
}

const ApplicationSchema = new Schema<ApplicationModel>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
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
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ApplicationDto = model<ApplicationModel>('Application', ApplicationSchema); 