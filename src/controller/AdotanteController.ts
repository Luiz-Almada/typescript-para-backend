// AdotanteController.ts
import { Request, Response } from "express";
import AdotanteEntity from '../entities/AdotanteEntity';
import AdotanteRepository from '../repositories/AdotanteRepository';
import EnderecoEntity from '../entities/EnderecoEntity';

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class AdontanteController {
  constructor(private repository: AdotanteRepository) {}
  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

      const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco
      );

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).json(novoAdotante);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }

    return res.sendStatus(204);
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    return res.json(listaDeAdotantes);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body as EnderecoEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }    
}