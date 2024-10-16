import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoRequestParamsAdotante = { id?: string };

type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular">
    | Pick<AdotanteEntity, "id" | "nome" | "celular">[];
  error?: unknown;
};

export {
  TipoRequestBodyAdotante,
  TipoResponseBodyAdotante,
  TipoRequestParamsAdotante,
};
