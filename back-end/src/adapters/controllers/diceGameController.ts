import { Request, Response } from 'express';

export const test = (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'Successfully connection'
  });
};
