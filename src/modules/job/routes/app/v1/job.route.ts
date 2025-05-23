import { Router } from 'express';
import { getJobById, getJobsWithPagination, saveJob, updateJobStatus, updateJob } from '@/modules/job/controller/job.controller';
import { validateRequest } from '@/src/middleware/validateRequest';
import jobRequest from '@/modules/job/controller/request/job.request';

const jobRouter: Router = Router();

jobRouter.post('/create-job', validateRequest(jobRequest.saveJobSchema), saveJob);
jobRouter.put('/update-job-status/:id', updateJobStatus);
jobRouter.put('/update-job/:id', validateRequest(jobRequest.updateJobSchema), updateJob);
jobRouter.get('/get-job/:id', getJobById);
jobRouter.get('/get-jobs-with-pagination', getJobsWithPagination);

export default jobRouter;
