// controllers/application.controller.ts
import { Request, Response } from 'express';
import { errorResponse } from '../../../utils/common.util';
import applicationService from '../service/application.service';
import { ApplicationResponse } from '../data/dtos/application.dto';
import { submitApplicationSchema } from './request/application.request';
import { uploadResumeService } from '../service/resume.service';
import { GoogleAuthService } from '@/src/middlewares/googleAuth';
import { GoogleMeetingService } from '@/src/middlewares/calendar.service';

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application: ApplicationResponse | null = await applicationService.getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json(errorResponse('Application not found'));
    }

    res.status(200).json({
      ...application,
      resumeSignedUrl: application.resumeSignedUrl || null
    });
  } catch (error: any) {
    console.error('Error in getApplicationById:', error);
    res.status(400).json(errorResponse(error.message));
  }
};

export const getApplicationsWithPagination = async (req: Request, res: Response) => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;

    const filters = {
      jobId: req.query.jobId as string | undefined,
      status: req.query.status as any,
      search: req.query.search as string | undefined
    };

    const response = await applicationService.getApplicationsWithPagination(filters, { page, limit });
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error in getApplicationsWithPagination:', error);
    res.status(400).json(errorResponse(error.message));
  }
};

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const validatedData = submitApplicationSchema.parse(req.body);

    const result = await applicationService.submitApplication(validatedData);
    if (!result) {
      return res.status(400).json(errorResponse('Failed to submit application'));
    }

    res.status(201).json({
      status: true,
      id: result.id,
      resumeUrl: result.resumeUrl
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
    const updated = await applicationService.updateApplicationStatus(req.params.id, status);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    const uploadResult = await uploadResumeService(req.file);
    res.status(200).json(uploadResult);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const { summary, description, startDateTime, endDateTime, attendeesEmails, location, applicationId } = req.body;

    if (!summary || !startDateTime || !endDateTime) {
      return res.status(400).json(errorResponse('Missing required fields: summary, startDateTime, endDateTime'));
    }

    const authClient = await GoogleAuthService.authorize(); // ✅ await the promise
    const meetingService = new GoogleMeetingService(authClient); // ✅ pass the client


    const meeting = await meetingService.createMeeting({
      summary,
      description,
      startDateTime,
      endDateTime,
      attendeesEmails,
      location,
      applicationId
    });

    console.log("meeting",meeting);

    res.status(201).json({
      status: true,
      meeting,
    });
  } catch (error: any) {
    console.error('Error creating Google meeting:', error);
    res.status(500).json(errorResponse(error.message));
  }
};
