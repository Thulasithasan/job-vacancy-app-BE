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
  workLocation?: 'remote' | 'onsite' | 'hybrid';
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
  const query: any = { isDeleted: false };
  
  // Add status filter
  if (filters.status) {
    query.status = filters.status;
  }
  
  // Add job type filter
  if (filters.jobType) {
    query.jobType = filters.jobType;
  }
  
  // Add work location filter
  if (filters.workLocation) {
    query.workLocation = filters.workLocation;
  }
  
  // Add search filter
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  console.log('Query:', JSON.stringify(query, null, 2));

  // Get total count for pagination
  const total = await JobDto.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  // Get paginated results
  const jobs = await JobDto.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  console.log('Found jobs:', jobs.length);

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
