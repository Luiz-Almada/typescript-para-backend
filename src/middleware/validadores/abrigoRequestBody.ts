import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { TipoRequestBodyAbrigo } from "../../tipos/tiposAbrigo";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../Utils/trataValidacaoYup";

yup.setLocale(pt);

const esquemaBodyAbrigo: yup.ObjectSchema<
  Omit<TipoRequestBodyAbrigo, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Número de celular inválido"
    ),
  email: yup.string().email().defined().required(),
  senha: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "Senha inválida"
    ),
});

export const middlewareValidadorBodyAbrigo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  tratarErroValidacaoYup(esquemaBodyAbrigo, req, res, next);
};
