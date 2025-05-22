import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  addAnswerToQuestion,
  getQuestionsByJobId,
  deleteQuestion,
  getQuestionsWithPagination
} from '../controller/question.controller';
import { validateRequest } from '../../../middleware/validateRequest';
import questionRequest from '../controller/request/question.request';

const router = Router();

// Create a new question
router.post(
  '/create-question',
  validateRequest(questionRequest.saveQuestionWithAnswersSchema),
  createQuestion
);

// Get questions with pagination
router.get('/get-questions', getQuestionsWithPagination);

// Get a question by ID
router.get('/get-question/:id', getQuestionById);

// Add an answer to a question
router.post(
  '/add-answer/:questionId',
  validateRequest(questionRequest.addAnswerSchema),
  addAnswerToQuestion
);

// Get all questions by jobId
router.get('/get-questions-by-job/:jobId', getQuestionsByJobId);

// Delete a question
router.delete('/delete-question/:id', deleteQuestion);

export default router; 