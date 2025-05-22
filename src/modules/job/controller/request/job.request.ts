import { z } from 'zod';

const answerSchema = z.object({
  answerText: z.string({ required_error: 'Answer text is required' })
    .min(1, { message: 'Answer text must be non-empty' })
    .max(500, { message: 'Answer text must be under 500 characters' })
});

const jobQuestionSchema = z.object({
  questionId: z.string({ required_error: 'Question ID is required' }),
  questionText: z.string({ required_error: 'Question text is required' })
    .min(1, { message: 'Question text must be non-empty' })
    .max(200, { message: 'Question text must be under 200 characters' }),
  answers: z.array(answerSchema)
    .min(1, { message: 'At least one answer is required' })
});

const saveJobSchema = z.object({
  title: z
    .string({ required_error: 'Job title is required' })
    .max(100, { message: 'Title must be under 100 characters' }),

  status: z.enum(['open', 'closed', 'paused'], {
    required_error: 'Job status is required',
  }),

  jobType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance'], {
    required_error: 'Job type is required',
  }),

  description: z
    .string({ required_error: 'Job description is required' })
    .max(1000, { message: 'Description must be under 1000 characters' }),

  requirements: z
    .array(
      z.string().min(1, { message: 'Each requirement must be non-empty' })
    )
    .min(1, { message: 'At least one requirement is required' }),

  responsibilities: z
    .array(
      z.string().min(1, { message: 'Each responsibility must be non-empty' })
    )
    .min(1, { message: 'At least one responsibility is required' }),

  postedDate: z
    .string({ required_error: 'Posted date is required' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Posted date must be in DD/MM/YYYY format' }),

  applicationDeadline: z
    .string({ required_error: 'Application deadline is required' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Deadline must be in DD/MM/YYYY format' }),

  workLocation: z.enum(['remote', 'onsite', 'hybrid'], {
    required_error: 'Work location type is required',
  }).default('onsite'),

  questions: z.array(jobQuestionSchema)
    .min(1, { message: 'At least one question is required' }),

  createdBy: z.string({ required_error: 'Created by user ID is required' })
    .min(1, { message: 'Created by user ID must be provided' }),
});

export type SaveJobRequest = z.infer<typeof saveJobSchema>;

export default {
  saveJobSchema,
};
