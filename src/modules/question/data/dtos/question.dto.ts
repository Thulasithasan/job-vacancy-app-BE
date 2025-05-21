import mongoose, { Schema, model } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

export interface Answer {
  answerText: string;
  createdAt: Date;
}

export interface QuestionModel extends BaseModel {
  jobId: mongoose.Types.ObjectId; // <-- Use mongoose.Types.ObjectId
  questionText: string;
  answers: Answer[];
}

const AnswerSchema = new Schema<Answer>({
  answerText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuestionSchema = new Schema<QuestionModel>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    answers: [AnswerSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const QuestionDto = model<QuestionModel>('Question', QuestionSchema);

export interface QuestionResponse {
  _id: string;
  jobId: string;
  questionText: string;
  answers: {
    answerText: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
