import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interface/interfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {

  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }

  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(id: number, newAdotante: AdotanteEntity): Promise<{success: boolean; message?: string}> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if(!adotanteToUpdate) {
        return { success: false, message: `Adotante com o id: ${id} nao econtrado` };
      }

      Object.assign(adotanteToUpdate, newAdotante);

      await this.repository.save(adotanteToUpdate);

      return { success: true };

    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao atualizar adotante" };
    }
  }

  async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }> {
    try {
      const AdotanteToDelete = await this.repository.findOne({ where: { id } });

      if(!AdotanteToDelete) {
        return { success: false, message: `Adotante com o id: ${id} nao econtrado` };
      }

      await this.repository.remove(AdotanteToDelete);

      return { success: true };

    } catch (error) {
      console.log(error);
      return { success: false,  message: "Erro ao deletar adotante"};
    }
  }

  async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
    try {
      const adotante = await this.repository.findOne({ where: { id: idAdotante } });

      if(!adotante) {
        return { success: false, message: `Adotante com o id: ${idAdotante} nao econtrado` };
      }

      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);

      adotante.endereco = novoEndereco;

      await this.repository.save(adotante);
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false,  message: "Erro ao atualizar endereco"};
    }
  }
}