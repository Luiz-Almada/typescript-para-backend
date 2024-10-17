import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
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
  senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,"Senha inválida"),
  foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await esquemaBodyAdotante.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    // Record<chave, valor> é um objeto do Typescript
    const validationErrors: Record<string, string> = {};

    yupErrors.inner.forEach((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    });
    //return res.status(404).json({ error: yupErrors.message });
    return res.status(404).json({ error: validationErrors });
  }
};

export { middlewareValidadorBodyAdotante };
