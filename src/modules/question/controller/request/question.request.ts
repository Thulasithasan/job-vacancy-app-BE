import { z } from 'zod';

/**
 * Schema to validate an individual answer
 */
export const saveAnswerSchema = z.object({
  answerText: z
    .string({ required_error: 'Answer text is required' })
    .min(1, { message: 'Answer cannot be empty' }),
});

/**
 * Schema for saving a question along with its answers
 */
export const saveQuestionWithAnswersSchema = z.object({
  questionText: z
    .string({ required_error: 'Question text is required' })
    .min(5, { message: 'Question must be at least 5 characters' })
    .max(500, { message: 'Question must be under 500 characters' }),
  jobId: z.string().optional(),
  answers: z
    .array(saveAnswerSchema)
    .min(1, { message: 'At least one answer is required' }),
});

/**
 * Schema for adding a single answer to an existing question
 */
export const addAnswerSchema = z.object({
  answerText: z
    .string({ required_error: 'Answer text is required' })
    .min(1, { message: 'Answer cannot be empty' }),
});

/**
 * Types inferred from the above schemas
 */
export type SaveQuestionRequest = z.infer<typeof saveQuestionWithAnswersSchema>;
export type AddAnswerRequest = z.infer<typeof addAnswerSchema>;

/**
 * Exporting schemas for middleware validation use
 */
export default {
  saveQuestionWithAnswersSchema,
  addAnswerSchema,
};
