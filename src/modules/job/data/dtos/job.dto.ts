import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

export interface JobModel extends BaseModel {
  title: string;
  remote?: boolean;
  status: 'open' | 'closed' | 'paused';
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: Date;
  applicationDeadline: Date;
  createdBy: ObjectId; // ref to User or Company model
}

const JobSchema = new Schema<JobModel>(
  {
    title: { type: String, required: true, trim: true },
    remote: { type: Boolean, default: false },
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
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const JobDto = model<JobModel>('Job', JobSchema);
