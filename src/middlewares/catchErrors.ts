import { ErrorRequestHandler } from "express";
import type { Options } from "../utils/success.utils";
import AppError from "../services/application.error";

const catchErros: ErrorRequestHandler = (error:AppError, request, response, next) => {
  console.log(`
        PATH: ${request.path}
        because: ${error.cause}
        `);

    console.log(`
        error type: ${error.message}
        `)

  response.status(500).json({
    statusCode: 500,
    statusMessage:"fail",
    error:error.message
  }) ;
};


export default catchErros