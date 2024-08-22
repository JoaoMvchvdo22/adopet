import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/interfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepository implements InterfacePetRepository {

  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }

  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }

  async atualizaPet(id: number, newData: PetEntity): Promise<{success: boolean; message?: string}> {
    try {
      const petToUpdate = await this.petRepository.findOne({where: { id } });

      if (!petToUpdate) {
        return { success: false, message: "Pet nao encontrado" };
      }

      Object.assign(petToUpdate, newData);

      await this.petRepository.save(petToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Algo deu errado, tente novamente mais tarde" };
    }
  }

  async deletaPet(id: number): Promise<{success: boolean; message?: string}> {
    try {
      const petToDelete = await this.petRepository.findOne({where: { id } });

      if (!petToDelete) {
        return { success: false, message: "Pet nao encontrado" };
      }

      await this.petRepository.remove(petToDelete);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Algo deu errado, tente novamente mais tarde" };
    }
  }

  async adotaPet(petId: number, adotanteId: number): Promise<{success: boolean; message?: string}> {
    try {
      const pet = await this.petRepository.findOne({ where: { id: petId } });

      if (!pet) {
        return { success: false, message: `Nenhum pet com o id: ${petId} encontrado` };
      }

      const adotante = await this.adotanteRepository.findOne({ where: { id: adotanteId } });

      if (!adotante) {
        return { success: false, message: `Nenhum adotante com o id: ${adotanteId} encontrado` };
      }

      pet.adotante = adotante;
      pet.adotado = true;

      await this.petRepository.save(pet);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Algo deu errado, tente novamente mais tarde" };
    }
  }

  async buscaPetPorCampoGenerico<T extends keyof PetEntity>(campo: T, valor: PetEntity[T]): Promise<PetEntity[]> {
    const pets =  await this.petRepository.find({ where: { [campo]: valor } });
    return pets;
  }

}