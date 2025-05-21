import { JobModel } from '../../data/dtos/job.dto';


export interface JobResponseData {
  _id: string;
  title: string;
  remote: boolean;
  status: 'open' | 'closed' | 'paused'; // or use enum
  jobType: 'full-time' | 'part-time' | 'internship' | 'contract'; // or enum
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  postedDate: Date;
  applicationDeadline: Date;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
