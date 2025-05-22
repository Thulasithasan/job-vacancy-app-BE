import { Router } from 'express';
import { textSpanOverlap } from 'typescript';
import { getApplicationById, getApplicationsWithPagination, submitApplication, updateApplicationStatus, uploadResume } from '@/modules/application/controller/application.controller';
import { uploadResume as uploadResumeMiddleware } from '../../../../../middlewares/file.handler';

const applicationRouter: Router = Router();

applicationRouter.post('/submit-application', submitApplication);
applicationRouter.get('/get-application/:id', getApplicationById);
applicationRouter.put('/update-application-status/:id', updateApplicationStatus);
applicationRouter.get('/get-application-with-pagination', getApplicationsWithPagination);
applicationRouter.post('/upload-resume', uploadResumeMiddleware, uploadResume);

export default applicationRouter;
