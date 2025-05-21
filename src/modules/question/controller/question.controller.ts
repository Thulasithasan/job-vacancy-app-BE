import { Request, Response } from 'express';
import { errorResponse } from '../../../utils/common.util';
import questionService from '../service/question.service';
import { SaveQuestionRequest, AddAnswerRequest } from './request/question.request';
import { CreatedUpdatedResponse } from '../../base/controller/responses/base.repsonse';
import { QuestionModel } from '../data/dtos/question.dto';

// Create a question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const payload = req.body as SaveQuestionRequest;
    const response: CreatedUpdatedResponse = await questionService.createQuestion(payload);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

// Get a question by ID
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question: QuestionModel | null = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json(errorResponse('Question not found'));
    }
    res.status(200).json(question);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

// Add an answer to a question
export const addAnswerToQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;
    const payload = req.body as AddAnswerRequest;
    const updatedQuestion = await questionService.addAnswerToQuestion(questionId, payload);
    if (!updatedQuestion) {
      return res.status(404).json(errorResponse('Question not found'));
    }
    res.status(200).json(updatedQuestion);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

// Get all questions by jobId
export const getQuestionsByJobId = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const questions = await questionService.getQuestionsByJobId(jobId);
    res.status(200).json(questions);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

// Delete a question (soft delete)
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;
    await questionService.deleteQuestion(questionId);
    res.status(200).json({ status: true, message: 'Question deleted successfully' });
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};
