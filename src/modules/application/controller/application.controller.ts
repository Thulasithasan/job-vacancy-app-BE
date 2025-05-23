import { Request, Response } from 'express';
import { errorResponse } from '../../../utils/common.util';
import applicationService from '../service/application.service';
import { ApplicationModel, ApplicationResponse } from '../data/dtos/application.dto';
import { submitApplicationSchema } from './request/application.request';
import { UserJWT } from '../../user/data/dtos/user.jwt.dto';
import { uploadResumeService } from '../service/resume.service';

interface AuthenticatedRequest extends Request {
  user?: UserJWT;
}

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const response: ApplicationResponse | null = await applicationService.getApplicationById(req.params.id);
    if (!response) {
      return res.status(404).json(errorResponse('Application not found'));
    }

    // Ensure we're sending the complete response including resumeSignedUrl
    const applicationResponse = {
      ...response,
      resumeSignedUrl: response.resumeSignedUrl || null
    };

    res.status(200).json(applicationResponse);
  } catch (error: any) {
    console.error('Error in getApplicationById:', error);
    res.status(400).json(errorResponse(error.message));
  }
};

export const getApplicationsWithPagination = async (req: Request, res: Response) => {
  try {
    let page = 1;
    let limit = 10;
    let filters: any = {};

    // Handle both formats: direct query params and nested filters/pagination
    if (req.query.filters || req.query.pagination) {
      // Handle nested format: filters[status] and pagination[page]
      const queryFilters = req.query.filters as any;
      const queryPagination = req.query.pagination as any;

      if (queryFilters) {
        filters = {
          jobId: queryFilters.jobId,
          status: queryFilters.status,
          search: queryFilters.search
        };
      }

      if (queryPagination) {
        page = parseInt(queryPagination.page as string) || 1;
        limit = parseInt(queryPagination.limit as string) || 10;
      }
    } else {
      // Handle direct format: status, page, limit
      page = parseInt(req.query.page as string) || 1;
      limit = parseInt(req.query.limit as string) || 10;
      
      filters = {
        jobId: req.query.jobId as string | undefined,
        status: req.query.status as 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted' | undefined,
        search: req.query.search as string | undefined
      };
    }

    console.log('Request filters:', filters);
    console.log('Pagination:', { page, limit });

    const response = await applicationService.getApplicationsWithPagination(
      filters,
      { page, limit }
    );
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error in getApplicationsWithPagination:', error);
    res.status(400).json(errorResponse(error.message));
  }
};

export const submitApplication = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = submitApplicationSchema.parse(req.body);
    
    const response = await applicationService.submitApplication(validatedData);
    if (!response) {
      return res.status(400).json(errorResponse('Failed to submit application'));
    }
    
    res.status(201).json({
      status: true,
      id: response.id,
      resumeUrl: response.resumeUrl
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json(errorResponse(error.errors));
    }
    res.status(400).json(errorResponse(error.message));
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const response = await applicationService.updateApplicationStatus(req.params.id, status);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    const result = await uploadResumeService(req.file);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};