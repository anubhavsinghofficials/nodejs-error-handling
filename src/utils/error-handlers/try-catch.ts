import { NextFunction, Request, Response } from 'express';

export const trycatch =
  (controller: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err: unknown) {
      next(err);
    }
  };


  // this is the async-await way of doing it.
  // also see promise way of doing it eg:
  // https://youtu.be/S5EpsMjel-M?si=fnpL2rcxxHonhAbq