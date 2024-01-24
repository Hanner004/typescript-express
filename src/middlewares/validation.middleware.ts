import { RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(', ');
          res.status(400).json({ statusCode: 400, message });
        } else {
          next();
        }
      },
    );
  };
}

export default validationMiddleware;
