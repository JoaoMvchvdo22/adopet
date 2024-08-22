import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): Promise<PetEntity[]> | Array<PetEntity>;
  atualizaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
  deletaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
  adotaPet(petId: number, adotanteId: number): Promise<{ success: boolean; message?: string }> | void;
  buscaPetPorCampoGenerico<T extends keyof PetEntity>(campo: T, valor: PetEntity[T]): Promise<PetEntity[]> | Array<PetEntity>;
}