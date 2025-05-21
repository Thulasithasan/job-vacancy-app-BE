import { Request, Response } from 'express';
import { errorResponse } from '../../../utils/common.util';
import applicationService from '../service/application.service';
import { ApplicationModel } from '../data/dtos/application.dto';
import { submitApplicationSchema } from './request/application.request';
import { UserJWT } from '../../user/data/dtos/user.jwt.dto';

interface AuthenticatedRequest extends Request {
  user?: UserJWT;
}

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const response: ApplicationModel | null = await applicationService.getApplicationById(req.params.id);
    if (!response) {
      return res.status(404).json(errorResponse('Application not found'));
    }
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getApplicationsWithPagination = async (req: Request, res: Response) => {
  try {
    const { filters, pagination } = req.body;
    const response = await applicationService.getApplicationsWithPagination(filters, pagination);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const submitApplication = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = submitApplicationSchema.parse(req.body);
    
    const response = await applicationService.submitApplication(validatedData);
    res.status(201).json({ status: true, id: response });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json(errorResponse(error.errors));
    }
    res.status(400).json(errorResponse(error.message));
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const response = await applicationService.updateApplicationStatus(id, status);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};