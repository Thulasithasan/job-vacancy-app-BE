export interface AnswerResponse {
  _id: string;
  answerText: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse {
  _id: string;
  jobId: string; 
  questionText: string;
  answers: AnswerResponse[]; 
  createdAt: Date;
  updatedAt: Date;
}
