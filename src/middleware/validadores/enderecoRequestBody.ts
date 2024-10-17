import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../Utils/trataValidacaoYup";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

export const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  tratarErroValidacaoYup(esquemaBodyEndereco, req, res, next);
};
