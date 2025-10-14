import * as Joi from 'joi';
import { LoggerLevelMap, LogService } from 'caserita-infra/packages/common-logger';

export const schemaEnvVars = Joi.object({
  MICROSERVICE_NAME: Joi.string().required(),
  APP_RUNNING_ENV: Joi.string().required().valid('HTTP', 'NATS').default('NATS'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  LOGGER_LEVEL: Joi.string()
    .valid(...Object.values(LoggerLevelMap))
    .required(),
  LOGGER_ENABLED: Joi.boolean().required(),
  LOGGER_CLOUD: Joi.string()
    .valid(...Object.values(LogService))
    .required(),
  TOKEN_LOGTAIL_LOGGER: Joi.string()
    .required()
    .when('LOGGER_CLOUD', { is: LogService.LOCAL, then: Joi.string().allow('') }),
});
