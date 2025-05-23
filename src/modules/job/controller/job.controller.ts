import { Request, Response } from 'express';
import { errorResponse } from '../../../utils/common.util';
import {
  BaseResponse,
  CreatedUpdatedResponse,
} from '../../base/controller/responses/base.repsonse';
import {
  SaveJobRequest,
} from './request/job.request';
import jobService from '../service/job.service';
import { JobModel } from '../data/dtos/job.dto';

export const saveJob = async (req: Request, res: Response) => {
  try {
    const response: CreatedUpdatedResponse =
      await jobService.saveJob(
        req.body as unknown as SaveJobRequest
      );
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const response: JobModel | null =
      await jobService.getJobById(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const updateJobStatus = async (req: Request, res: Response) => {
  try {
    const response: JobModel | null =
      await jobService.updateJobStatus(req.params.id, req.body.status);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const response: JobModel | null =
      await jobService.updateJob(req.params.id, req.body as SaveJobRequest);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getJobsWithPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const jobType = req.query.jobType as string;
    const workLocation = req.query.workLocation as string;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const response = await jobService.getJobsWithPagination(page, limit, {
      jobType,
      workLocation,
      status,
      search
    });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};  