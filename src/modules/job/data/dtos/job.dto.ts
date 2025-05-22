import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

export interface JobQuestion {
  questionText: string;
  answers: {
    answerText: string;
    createdAt: Date;
  }[];
}

export interface JobModel extends BaseModel {
  title: string;
  workLocation: 'remote' | 'onsite' | 'hybrid';
  status: 'open' | 'closed' | 'paused';
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: Date;
  applicationDeadline: Date;
  createdBy: ObjectId; // ref to User or Company model
  questions: JobQuestion[];
}

const JobQuestionSchema = new Schema<JobQuestion>({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  answers: [{
    answerText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

const JobSchema = new Schema<JobModel>(
  {
    title: { type: String, required: true, trim: true },
    workLocation: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true,
      default: 'onsite'
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'paused'],
      required: true,
      default: 'open',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
      required: true,
    },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    responsibilities: [{ type: String, required: true }],
    postedDate: { type: Date, required: true },
    applicationDeadline: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // or 'Company' if separate
      required: true,
      index: true,
    },
    questions: [JobQuestionSchema],
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const JobDto = model<JobModel>('Job', JobSchema);
