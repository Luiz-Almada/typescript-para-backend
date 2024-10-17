// PetRouter.ts
import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyPet(req, res, next);

router.post("/", validateBodyPet, (req, res) =>
  petController.criaPet(req, res)
);
router.get("/", (req, res) => petController.listaPet(req, res));
router.put("/:id", (req, res) => petController.atualizaPet(req, res)); // Rota para atualizar o pet
router.delete("/:id", (req, res) => petController.deletaPet(req, res)); // Rota para deletar o pet
router.put("/:pet_id/:adotante_id", (req, res) =>
  petController.adotaPet(req, res)
); // Rota para adotar o pet
router.get("/filtroPorte", (req, res) =>
  petController.buscaPetPeloPorte(req, res)
); // Busca Pet pelo Porte
router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
); // Busca Pet pelo Porte
export default router;
