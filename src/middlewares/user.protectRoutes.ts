import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";
import AppError from "../services/application.error";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string | number;
      };
    }
  }
}

type MiddleWare = (
  request: Request,
  response: Response,
  next: NextFunction
) => any;
export const verifyUser: MiddleWare = async (request, response, next) => {
  try {
    const token = request.cookies?.jwt as string;

    if (!token) return response.status(403).send("No token provided ");

    const decoded = jwt.verify(
      token.trim(),
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) return response.status(403).send("Not Authorized ");

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user)
      throw new AppError("Not Authorized", { couse: "empty or invalid id " });

    request.user = { id: decoded?.id as number };
    next();
  } catch (error) {
    next(error);
  }
};

export const verifySelf: MiddleWare = async (request, response, next) => {
  await verifyUser(request, response, async () => {
    try {
      const { postID } = request.params;
      const post = await prisma.post.findUnique({
        where: {
          id: Number(postID),
        },
      });
      if (request.user.id === post?.authorId) {
        next();
        return;
      }
      throw new AppError("You are not allowed to edit this post", {
        cause: "invalid user",
      });
    } catch (error) {
      next(error);
    }
  });
};
