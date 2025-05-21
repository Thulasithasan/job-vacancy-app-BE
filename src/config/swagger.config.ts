import { baseSwaggerConfig } from './swagger/base.swagger';
import { jobSwagger } from '../modules/job/swagger/job.swagger';
import { applicationSwagger } from '../modules/application/swagger/application.swagger';
import { userSwagger } from '../modules/user/swagger/user.swagger';
import { questionSwagger } from '../modules/question/swagger/question.swagger';

export const swaggerConfig = {
  ...baseSwaggerConfig,
  paths: {
    ...jobSwagger,
    ...applicationSwagger,
    ...userSwagger,
    ...questionSwagger
  }
}; 