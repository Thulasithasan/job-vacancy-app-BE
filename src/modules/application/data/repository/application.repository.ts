import { ApplicationDto, ApplicationModel } from '../dtos/application.dto';
import { SubmitApplicationRequest } from '../../controller/request/application.request';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface ApplicationFilters {
  jobId?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
}

async function getApplicationById(id: string): Promise<ApplicationModel | null> {
  return await ApplicationDto.findById(id)
    .populate('jobId');
}

async function getApplicationsWithPagination(
  filters: ApplicationFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<{ applications: ApplicationModel[]; total: number; page: number; totalPages: number }> {
  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  // Build filter query
  const query: any = {};
  
  if (filters.jobId) {
    query.jobId = filters.jobId;
  }
  
  if (filters.status) {
    query.status = filters.status;
  }

  // Get total count for pagination
  const total = await ApplicationDto.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  // Get paginated results with populated fields
  const applications = await ApplicationDto.find(query)
    .populate('jobId')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    applications,
    total,
    page,
    totalPages
  };
}

async function submitApplication(
  applicationData: SubmitApplicationRequest
): Promise<string | null> {
  const newApplication = new ApplicationDto({
    ...applicationData,
    applicationDate: new Date()
  });
  const { _id } = await newApplication.save();
  return _id as string;
}

async function updateApplicationStatus(id: string, status: string): Promise<ApplicationModel | null> {  
  return await ApplicationDto.findByIdAndUpdate(id, { status }, { new: true });
}

export default {
  getApplicationById,
  getApplicationsWithPagination,
  submitApplication,
  updateApplicationStatus
}; 