import express, { NextFunction } from 'express';

const catchError = (
  func: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>
) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    func(req, res, next).catch((e: Error) => next(e));
  };
};

export { catchError };
