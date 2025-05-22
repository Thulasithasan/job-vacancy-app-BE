import { ApplicationDto, ApplicationModel } from '../dtos/application.dto';
import { SubmitApplicationRequest } from '../../controller/request/application.request';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface ApplicationFilters {
  jobId?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
<<<<<<< HEAD
  search?: string;
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
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
<<<<<<< HEAD
  const query: any = { isDeleted: false };
  
  // Add job ID filter
=======
  const query: any = {};
  
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
  if (filters.jobId) {
    query.jobId = filters.jobId;
  }
  
<<<<<<< HEAD
  // Add status filter
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
  if (filters.status) {
    query.status = filters.status;
  }

<<<<<<< HEAD
  // Add search filter
  if (filters.search) {
    query.$or = [
      { firstName: { $regex: filters.search, $options: 'i' } },
      { lastName: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }

  console.log('Query:', JSON.stringify(query, null, 2));

=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
  // Get total count for pagination
  const total = await ApplicationDto.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  // Get paginated results with populated fields
  const applications = await ApplicationDto.find(query)
    .populate('jobId')
    .skip(skip)
    .limit(limit)
<<<<<<< HEAD
    .sort({ createdAt: -1 })
    .lean();

  console.log('Found applications:', applications.length);
=======
    .sort({ createdAt: -1 });
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5

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