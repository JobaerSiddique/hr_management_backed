// import { Request, Response, NextFunction } from 'express';
// import Joi from 'joi';
// import ApiError from '../utils/ApiError';

// export const validate = (schema: Joi.ObjectSchema) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const { error } = schema.validate(JSON.parse(req.body.data), {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     if (error) {
//       const message = error.details
//         .map((detail) => detail.message)
//         .join(', ');
//       next(new ApiError(400, message));
//     } else {
//       next();
//     }
//   };
// };


import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    let dataToValidate;
    
    // Check if data is coming as JSON string in 'data' field
    if (req.body.data && typeof req.body.data === 'string') {
      try {
        dataToValidate = JSON.parse(req.body.data);
      } catch (error) {
        return next(new ApiError(400, 'Invalid JSON in data field'));
      }
    } else {
      // Otherwise use req.body directly
      dataToValidate = req.body;
    }

    console.log('Data to validate:', dataToValidate); // Debug log

    const { error } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(', ');
      next(new ApiError(400, message));
    } else {
      // Update req.body with validated data
      req.body = { ...dataToValidate };
      next();
    }
  };
};