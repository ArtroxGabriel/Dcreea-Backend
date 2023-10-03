import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '@exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors && errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            if (error.constraints) return Object.values(error.constraints);
            if (error.children && error.children.length > 0) return error.children.map((child: ValidationError) => child.toString().split(' \n'));
            return `Error in property ${error.property}`;
          })
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
