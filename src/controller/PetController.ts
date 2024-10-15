import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
//let listaDePets: Array<TipoPet> = []; ou
let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {
  constructor(private repository: PetRepository) {}
  async criaPet(req: Request, res: Response) {
    //const novoPet = req.body as TipoPet;
    const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>(
      req.body
    );
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erro: "Espécie inválida" });
    }
    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ erro: "Porte inválido" });
    }

    const novoPet: PetEntity = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );
    await this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPet(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;
    const listaDePets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );
    return res.status(200).json(listaDePets);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
    return res.status(200).json(listaDePets);
  }
  /*
   atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }

    pet.nome = nome;
    pet.dataDeNascimento = dataDeNascimento;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
 */
}
