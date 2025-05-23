import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || ''
  }
});

const BUCKET_NAME = 'nextgenjobvacancyweb';
const RESUME_FOLDER = 'resume';

// Configure multer memory storage
const storage = multer.memoryStorage();

// File filter to only allow specific file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Middleware to handle single file upload
export const uploadResume = upload.single('resume');

// Function to upload file to S3
export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
  const key = `${RESUME_FOLDER}/${uniqueFilename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  return key;
};

// Function to get signed URL for file access
export const getResumeUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  // URL expires in specified seconds (default 1 hour)
  return await getSignedUrl(s3Client, command, { expiresIn });
};

// Middleware to handle upload errors and attach file info to request
export const handleResumeUpload = async (req: Request, res: Response, next: NextFunction) => {
  uploadResume(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Upload to S3 and get the key
      const s3Key = await uploadToS3(req.file);

      // Attach file information to request
      req.resumeFile = {
        key: s3Key,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      };

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload file to S3' });
    }
  });
};

// Interface for resume file information
declare global {
  namespace Express {
    interface Request {
      resumeFile?: {
        key: string;
        originalname: string;
        size: number;
        mimetype: string;
      };
    }
  }
}

