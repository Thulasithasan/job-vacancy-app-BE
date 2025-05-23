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
  page: number = 1,
  limit: number = 10,
  filters: {
    jobType?: string;
    workLocation?: string;
    status?: string;
    search?: string;
  } = {}
): Promise<{ jobs: JobModel[]; total: number; page: number; totalPages: number }> {
  const query: any = { isDeleted: false };

  if (filters.jobType) {
    query.jobType = filters.jobType;
  }

  if (filters.workLocation) {
    query.workLocation = filters.workLocation;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;
  
  const [jobs, total] = await Promise.all([
    JobDto.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec(),
    JobDto.countDocuments(query)
  ]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

export default {
  saveJob,
  getJobById,
  updateJob,
  updateJobStatus,
  getJobsWithPagination
};
