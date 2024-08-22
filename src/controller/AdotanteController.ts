import AdotanteEntity from "./../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { Request, Response } from "express";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController {

  constructor(private repository: AdotanteRepository) { }

  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity;

      const adotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco
      );

      await this.repository.criaAdotante(adotante);
      return res.status(201).json(adotante);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar adotante"});
    }
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaAdotantes = await this.repository.listaAdotante();
    return res.status(200).json(listaAdotantes);
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);

    if (!success) {
      return res.status(404).json(message);
    }

    return res.sendStatus(204);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaAdotante(Number(id));

    if (!success) {
      return res.status(404).json(message);
    }

    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);

    if (!success) {
      return res.status(404).json(message);
    }

    return res.sendStatus(204);
  }
}