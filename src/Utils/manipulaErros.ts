//Não diretamente a classe Error e sim
//ela estendida porque a classe Error
//não possui statusCode

import { EnumHttpStatusCode } from '../enum/EnumHttpStatusCode';

export class ManipulaErros extends Error{
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

//Especificando melhor erros (Ex: parâmetro passado errado)
export class RequisicaoRuim extends ManipulaErros{
  constructor(message:string) {
    super(message, EnumHttpStatusCode.BAD_REQUEST);
    
  }
}

export class NaoEncontrado extends ManipulaErros{
  constructor(message:string) {
    super(message, EnumHttpStatusCode.NOT_FOUND);
    
  }
}