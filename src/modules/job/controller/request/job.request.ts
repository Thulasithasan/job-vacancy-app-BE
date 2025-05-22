import { z } from 'zod';

const saveJobSchema = z.object({
  title: z
    .string({ required_error: 'Job title is required' })
    .max(100, { message: 'Title must be under 100 characters' }),

  status: z.enum(['open', 'closed'], {
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
});

export type SaveJobRequest = z.infer<typeof saveJobSchema>;

export default {
  saveJobSchema,
};
