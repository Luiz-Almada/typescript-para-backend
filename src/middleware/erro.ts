import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../Utils/manipulaErros";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const errorMiddleware = (
  erro: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //const statusCode=erro.statusCode??500;
  const statusCode =
    erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

  const mensagem = erro.statusCode ? erro.message : "Erro interno do servidor";

  res.status(statusCode).json({ mensagem });
  return next();
};
