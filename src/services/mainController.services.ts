import { NextFunction, Request, Response } from "express";

type MainController = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<any>;

const mainController = (controller: MainController): MainController => {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export default mainController;
