import UserRepository from '../data/repository/job.repository';

import {
  CreatedUpdatedResponse,
} from '../../base/controller/responses/base.repsonse';

import {
  SaveJobRequest,
} from '../controller/request/job.request';
import { isValidObjectId } from 'mongoose';
import BaseRepository from '@/modules/base/data/repository/base.repository';
import { RoleDTO } from '@/modules/user/data/dtos/role.dto';
import jobRepository from '../data/repository/job.repository';
import { JobModel } from '../data/dtos/job.dto';


const saveJob = async (
  createJobRequest: SaveJobRequest
): Promise<CreatedUpdatedResponse> => {
  const id: string | null = await jobRepository.saveJob(createJobRequest);
  if (id != null) {
    return { status: true, id } as CreatedUpdatedResponse;
  }
  throw new Error('User not inserted');
};

const getJobById = async (id: string): Promise<JobModel | null> => {
  return await jobRepository.getJobById(id);
};

const updateJob = async (id: string, jobPayload: SaveJobRequest): Promise<JobModel | null> => {
  return await jobRepository.updateJob(id, jobPayload);
};

const updateJobStatus = async (id: string, status: 'open' | 'closed' | 'paused'): Promise<JobModel | null> => {
  return await jobRepository.updateJobStatus(id, status);
};

const getJobsWithPagination = async (
  page: number = 1,
  limit: number = 10,
  filters: {
    jobType?: string;
    workLocation?: string;
    status?: string;
    search?: string;
  } = {}
): Promise<{ jobs: JobModel[]; total: number; page: number; totalPages: number }> => {
  return await jobRepository.getJobsWithPagination(page, limit, filters);
};

export default {
  saveJob,
  getJobById,
  updateJob,
  updateJobStatus,
  getJobsWithPagination
};
