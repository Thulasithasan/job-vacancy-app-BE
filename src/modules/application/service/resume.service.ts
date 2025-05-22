import { Express } from 'express';
import { uploadToS3 } from '@/src/middlewares/file.handler';

export interface ResumeUploadResult {
  key: string;
  originalname: string;
  size: number;
  mimetype: string;
}

export const uploadResumeService = async (file: Express.Multer.File): Promise<ResumeUploadResult> => {
  try {
    const key = await uploadToS3(file);
    
    return {
      key,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    };
  } catch (error) {
    throw new Error('Failed to upload resume to S3');
  }
}; 