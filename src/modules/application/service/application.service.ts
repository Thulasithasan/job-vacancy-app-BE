import applicationRepository from '../data/repository/application.repository';
import { ApplicationModel } from '../data/dtos/application.dto';
import { SubmitApplicationRequest } from '../controller/request/application.request';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface ApplicationFilters {
  jobId?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
}

const getApplicationById = async (id: string): Promise<ApplicationModel | null> => {
  return await applicationRepository.getApplicationById(id);
};

const getApplicationsWithPagination = async (
  filters: ApplicationFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
) => {
  return await applicationRepository.getApplicationsWithPagination(filters, pagination);
};

const submitApplication = async (
  applicationData: SubmitApplicationRequest
): Promise<string | null> => {
  return await applicationRepository.submitApplication(applicationData);
};

const updateApplicationStatus = async (id: string, status: string): Promise<ApplicationModel | null> => {
  return await applicationRepository.updateApplicationStatus(id, status);
};

export default {
  getApplicationById,
  getApplicationsWithPagination,
  submitApplication,
  updateApplicationStatus
}; 