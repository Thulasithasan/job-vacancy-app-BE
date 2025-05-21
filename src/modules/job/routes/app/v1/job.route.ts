import { Router } from 'express';
import { getJobById, getJobsWithPagination, saveJob, updateJobStatus } from '@/modules/job/controller/job.controller';

const jobRouter: Router = Router();


jobRouter.post('/create-job', saveJob);
jobRouter.get('/get-job/:id', getJobById);
jobRouter.put('/update-job-status/:id', updateJobStatus);
jobRouter.get('/get-jobs-with-pagination', getJobsWithPagination);

export default jobRouter;
