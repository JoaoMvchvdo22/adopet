import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res)); // Rota para criar um adotante
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res)); // Rota para buscar os adotantes
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res)); // Rota para atualizar um adotante
router.delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res)); // Rota para deletar um adotante
router.patch("/:id", (req, res) => adotanteController.atualizaEnderecoAdotante(req, res)); // Rota para atualizar o endereco de um adotante

export default router;