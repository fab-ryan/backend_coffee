import { Request, Response } from 'express';

export const LogoutDecorator = (req: Request, res: Response) => {
  req.user = null;
  res.status(200).json({
    success: true,
    message: 'Logout successfully',
  });
};
