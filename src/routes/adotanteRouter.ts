// adotanteRouter.ts
import express from "express";
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from "../config/dataSource";
import AdotanteController from '../controller/AdotanteController';
const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res)); // Rota para criar um adotante
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res)
);
router.patch("/:id", (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);
export default router;
