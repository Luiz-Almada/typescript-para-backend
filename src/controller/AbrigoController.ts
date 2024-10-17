// AbrigoController.ts
import { Request, Response } from "express";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { EnumHttpStatusCode } from '../enum/EnumHttpStatusCode';

import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from "../tipos/tiposAbrigo";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}
  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, email, senha, endereco } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(
      nome,
      celular,
      email,
      senha,
      endereco
    );

    await this.repository.criaAbrigo(novoAbrigo);
    return res
      .status(EnumHttpStatusCode.CREATED)
      .json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(
      Number(id),
      req.body as AbrigoEntity
    );

    return res.sendStatus(EnumHttpStatusCode.OK);
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();
    const dados = listaDeAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        celular: abrigo.celular,
        email: abrigo.email,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      };
    });
    return res.json({ dados });
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.deletaAbrigo(Number(id));
    return res.sendStatus(EnumHttpStatusCode.OK);
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);
    return res.sendStatus(EnumHttpStatusCode.OK);
  }
}
