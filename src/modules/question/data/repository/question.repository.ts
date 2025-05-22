import mongoose from 'mongoose';
import { QuestionDto, QuestionModel } from '../dtos/question.dto';

// Save question; convert jobId string to ObjectId if needed
async function saveQuestion(data: Partial<QuestionModel>): Promise<QuestionModel> {
  if (typeof data.jobId === 'string') {
    data.jobId = new mongoose.Types.ObjectId(data.jobId);
  }
  const question = new QuestionDto(data);
  return await question.save();
}

// Get question by ID
async function getQuestionById(id: string): Promise<QuestionModel | null> {
  return await QuestionDto.findById(id).exec();
}

// Add an answer to a question by pushing into answers array
async function addAnswerToQuestion(
  questionId: string,
  answerText: string
): Promise<QuestionModel | null> {
  return await QuestionDto.findByIdAndUpdate(
    questionId,
    {
      $push: {
        answers: {
          answerText,
          createdAt: new Date(),
        },
      },
    },
    { new: true } // return updated document
  ).exec();
}

// Get all questions by jobId (convert string to ObjectId)
async function getQuestionsByJobId(jobId: string): Promise<QuestionModel[]> {
  return await QuestionDto.find({
    jobId: new mongoose.Types.ObjectId(jobId),
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .exec();
}

// Get questions with pagination and filtering
async function getQuestionsWithPagination(
  page: number = 1,
  limit: number = 10,
  filters: {
    jobId?: string;
    search?: string;
  } = {}
): Promise<{ questions: QuestionModel[]; total: number; page: number; totalPages: number }> {
  const query: any = { isDeleted: false };

  if (filters.jobId) {
    query.jobId = new mongoose.Types.ObjectId(filters.jobId);
  }

  if (filters.search) {
    query.questionText = { $regex: filters.search, $options: 'i' };
  }

  const skip = (page - 1) * limit;
  
  const [questions, total] = await Promise.all([
    QuestionDto.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec(),
    QuestionDto.countDocuments(query)
  ]);

  return {
    questions,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

// Soft delete a question by setting isDeleted flag
async function deleteQuestion(id: string): Promise<void> {
  await QuestionDto.findByIdAndUpdate(id, { isDeleted: true });
}

export default {
  saveQuestion,
  getQuestionById,
  addAnswerToQuestion,
  getQuestionsByJobId,
  getQuestionsWithPagination,
  deleteQuestion,
};
