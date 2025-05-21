import { CreatedUpdatedResponse } from '../../base/controller/responses/base.repsonse';
import QuestionRepository from '../data/repository/question.repository';
import { SaveQuestionRequest, AddAnswerRequest } from '../controller/request/question.request';
import { QuestionModel } from '../data/dtos/question.dto';
import mongoose from 'mongoose';
const createQuestion = async (payload: SaveQuestionRequest): Promise<CreatedUpdatedResponse> => {
  const questionData: Partial<QuestionModel> = {
    jobId: new mongoose.Types.ObjectId(payload.jobId),
    questionText: payload.questionText,
    answers: payload.answers.map(answer => ({
      answerText: answer.answerText,
      createdAt: new Date()
    }))
  };
  const question = await QuestionRepository.saveQuestion(questionData);
  if (question && question._id) {
    return {
      status: true,
      id: question._id.toString(),
    };
  }
  throw new Error('Failed to create question');
};

const getQuestionById = async (id: string): Promise<QuestionModel | null> => {
  return await QuestionRepository.getQuestionById(id);
};

const addAnswerToQuestion = async (
  questionId: string,
  payload: AddAnswerRequest
): Promise<QuestionModel | null> => {
  return await QuestionRepository.addAnswerToQuestion(questionId, payload.answerText);
};

const getQuestionsByJobId = async (jobId: string): Promise<QuestionModel[]> => {
  return await QuestionRepository.getQuestionsByJobId(jobId);
};

const deleteQuestion = async (id: string): Promise<void> => {
  await QuestionRepository.deleteQuestion(id);
};

export default {
  createQuestion,
  getQuestionById,
  addAnswerToQuestion,
  getQuestionsByJobId,
  deleteQuestion,
};
