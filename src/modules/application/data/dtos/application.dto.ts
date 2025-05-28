import mongoose, { Schema, model, ObjectId, Document } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface MeetingDetails {
  eventId: string;
  link: string;
  start: string;
  end: string;
  summary: string;
  description: string;
  attendees: string[];
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
  questionAnswers: QuestionAnswer[];
  applicationDate: Date;
  notes?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  meeting?: MeetingDetails; // ✅ NEW: Meeting details
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
    questionAnswers: [
      {
        question: {
          type: String,
          required: true
        },
        answer: {
          type: String,
          required: true
        }
      }
    ],
    applicationDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    notes: {
      type: String
    },
    meeting: {
      eventId: { type: String },
      link: { type: String },
      start: { type: String },
      end: { type: String },
      summary: { type: String },
      description: { type: String },
      attendees: { type: Array }
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
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
