import { Response } from "express";

export type Options = {
  stausCode: number;
  statusMessage: "success" | "fail";
  data: {} | {}[];
};

export const success = (res: Response, option: Options) => {
  return res.status(option.stausCode).json({
    statusCode: option.stausCode,
    statusMessage: option.statusMessage,
    data: option.data,
  });
};
