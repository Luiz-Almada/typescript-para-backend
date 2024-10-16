import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const esquemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required(),
  senha: yup.string().defined().required().min(6),
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
