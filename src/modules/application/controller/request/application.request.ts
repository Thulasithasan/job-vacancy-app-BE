import { z } from 'zod';

const questionAnswerSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required')
});

export const submitApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  resume: z.string().min(1, 'Resume is required'),
  coverLetter: z.string()
    .min(1, 'Cover letter is required')
    .max(1000, 'Cover letter must not exceed 1000 words'),
  questionAnswers: z.array(questionAnswerSchema)
    .min(1, 'At least one question answer is required')
});

const scheduleRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  docLink: z.string().url('Invalid document link'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  attendeesEmails: z.array(z.string().email('Invalid email address')).min(1, 'At least one attendee email is required'),
});


export type SubmitApplicationRequest = z.infer<typeof submitApplicationSchema>;
