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

export const getJobsWithPagination = async (req: Request, res: Response) => {
  try {
    const { filters, pagination } = req.body;
    const response = await jobService.getJobsWithPagination(filters, pagination);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};  