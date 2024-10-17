import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await esquemaBodyEndereco.validate(req.body, {
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

export { middlewareValidadorBodyEndereco };
