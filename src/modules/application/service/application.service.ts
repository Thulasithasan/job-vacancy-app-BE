import applicationRepository from '../data/repository/application.repository';
import { ApplicationModel, ApplicationResponse } from '../data/dtos/application.dto';
import { SubmitApplicationRequest } from '../controller/request/application.request';
import { getResumeUrl } from '@/src/middlewares/file.handler';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface ApplicationFilters {
  jobId?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
}

const getApplicationById = async (id: string): Promise<ApplicationResponse | null> => {
  const application = await applicationRepository.getApplicationById(id);
  
  if (!application) {
    return null;
  }

  // Convert Mongoose document to plain object
  const applicationData = application.toObject();
  
  // Create response object
  const applicationResponse: ApplicationResponse = {
    ...applicationData,
    _id: applicationData._id.toString(),
    jobId: applicationData.jobId
  };
  
  // Generate signed URL if resume exists
  if (applicationData.resume) {
    try {
      const resumeSignedUrl = await getResumeUrl(applicationData.resume);
      applicationResponse.resumeSignedUrl = resumeSignedUrl;
    } catch (error) {
      console.error('Error generating resume URL:', error);
    }
  }
  
  return applicationResponse;
};

const getApplicationsWithPagination = async (
  filters: ApplicationFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
) => {
  return await applicationRepository.getApplicationsWithPagination(filters, pagination);
};

const submitApplication = async (
  applicationData: SubmitApplicationRequest
): Promise<{ id: string; resumeUrl: string } | null> => {
  const applicationId = await applicationRepository.submitApplication(applicationData);
  
  if (!applicationId) {
    return null;
  }

  try {
    const resumeUrl = await getResumeUrl(applicationData.resume);
    return {
      id: applicationId,
      resumeUrl
    };
  } catch (error) {
    console.error('Error generating resume URL:', error);
    return { id: applicationId, resumeUrl: '' };
  }
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