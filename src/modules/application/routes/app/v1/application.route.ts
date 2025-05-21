import { Router } from 'express';
import { textSpanOverlap } from 'typescript';
import { getApplicationById, getApplicationsWithPagination, submitApplication, updateApplicationStatus } from '@/modules/application/controller/application.controller';

const applicationRouter: Router = Router();


applicationRouter.post('/submit-application', submitApplication);
applicationRouter.get('/get-application/:id', getApplicationById);
applicationRouter.put('/update-application-status/:id', updateApplicationStatus);
applicationRouter.get('/get-application-with-pagination', getApplicationsWithPagination);

export default applicationRouter;
