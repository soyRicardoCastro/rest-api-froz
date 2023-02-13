import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, query, params } = req;
    schema.parse({ body, query, params });
    next();
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
};

export default validateResource;
