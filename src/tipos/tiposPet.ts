import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

type TipoResponseBodyPet = {
  dados?:
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
  erros?: unknown;
};

export { TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet };
