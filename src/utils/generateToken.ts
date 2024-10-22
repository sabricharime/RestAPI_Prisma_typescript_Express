import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, id: string | number) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

  res.cookie("jwt", token as string, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS,
    httpOnly: true, // prevent XSS cross site scripting
    sameSite:"strict",
    secure:false
  });

  return token;
};
