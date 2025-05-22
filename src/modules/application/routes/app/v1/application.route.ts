import { Router } from 'express';
import { textSpanOverlap } from 'typescript';
<<<<<<< HEAD
import { getApplicationById, getApplicationsWithPagination, submitApplication, updateApplicationStatus, uploadResume } from '@/modules/application/controller/application.controller';
import { uploadResume as uploadResumeMiddleware } from '../../../../../middlewares/file.handler';

const applicationRouter: Router = Router();

=======
import { getApplicationById, getApplicationsWithPagination, submitApplication, updateApplicationStatus } from '@/modules/application/controller/application.controller';

const applicationRouter: Router = Router();


>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
applicationRouter.post('/submit-application', submitApplication);
applicationRouter.get('/get-application/:id', getApplicationById);
applicationRouter.put('/update-application-status/:id', updateApplicationStatus);
applicationRouter.get('/get-application-with-pagination', getApplicationsWithPagination);
<<<<<<< HEAD
applicationRouter.post('/upload-resume', uploadResumeMiddleware, uploadResume);
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5

export default applicationRouter;
