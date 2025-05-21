import mongoose from 'mongoose';
import HelperUtil from '../../../../utils/helper.util';
import {
  SaveJobRequest,
} from '../../controller/request/job.request';
import { JobDto, JobModel } from '../dtos/job.dto';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface JobFilters {
  status?: 'open' | 'closed' | 'paused';
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  remote?: boolean;
  search?: string;
}

async function saveJob(
  jobPayload: SaveJobRequest
): Promise<string | null> {
  const newUser = new JobDto({
    ...jobPayload,
    isActive: true
  });
  const { _id } = await newUser.save();
  return _id as string;
}

async function getJobById(id: string): Promise<JobModel | null> {
  return await JobDto.findById(id);
}

async function updateJob(id: string, jobPayload: SaveJobRequest): Promise<JobModel | null> {
  return await JobDto.findByIdAndUpdate(id, jobPayload, { new: true });
}

async function updateJobStatus(id: string, status: 'open' | 'closed' | 'paused'): Promise<JobModel | null> {
  return await JobDto.findByIdAndUpdate(id, { status }, { new: true });
}

async function getJobsWithPagination(
  filters: JobFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<{ jobs: JobModel[]; total: number; page: number; totalPages: number }> {
  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  // Build filter query
  const query: any = {};
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.jobType) {
    query.jobType = filters.jobType;
  }
  
  if (filters.remote !== undefined) {
    query.remote = filters.remote;
  }
  
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  // Get total count for pagination
  const total = await JobDto.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  // Get paginated results
  const jobs = await JobDto.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    jobs,
    total,
    page,
    totalPages
  };
}

export default {
  saveJob,
  getJobById,
  updateJob,
  updateJobStatus,
  getJobsWithPagination
};
