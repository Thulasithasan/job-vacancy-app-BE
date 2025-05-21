import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  addAnswerToQuestion,
  getQuestionsByJobId,
  deleteQuestion,
} from '@/modules/question/controller/question.controller';

const questionRouter: Router = Router();

// Routes
questionRouter.post('/create-question', createQuestion);
questionRouter.get('/get-question/:id', getQuestionById);
questionRouter.put('/add-answer/:questionId', addAnswerToQuestion);
questionRouter.get('/get-questions-by-job/:jobId', getQuestionsByJobId);
questionRouter.delete('/delete-question/:id', deleteQuestion);

export default questionRouter;
