import mongoose, { Schema, model, Types } from 'mongoose';
import { BaseModel } from '../../../base/data/dtos/baseModel';

export interface Answer {
  answerText: string;
  createdAt: Date;
}

export interface QuestionModel extends BaseModel {
  questionText: string;
  answers: Answer[];
  jobId?: Types.ObjectId;
}

const AnswerSchema = new Schema<Answer>({
  answerText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuestionSchema = new Schema<QuestionModel>(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    answers: [AnswerSchema],
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: false
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const QuestionDto = model<QuestionModel>('Question', QuestionSchema);

export interface QuestionResponse {
  _id: string;
  questionText: string;
  answers: {
    answerText: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
