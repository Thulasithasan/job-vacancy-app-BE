export interface JobApplicationResponse {
  _id: string;
  jobId: string; // Reference to the job being applied for

  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  resumeUrl: string;
  coverLetter?: string;
  portfolioLinks?: string[];

  applicationDate: Date;

  status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted'; // Optional tracking

  createdAt: Date;
  updatedAt: Date;
}
