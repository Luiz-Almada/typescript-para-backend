//Resolver o problema de tratamento de erros
//em requisições assíncronas
//deve-se instalar o pacote:
//  - npm i express-async-errors
import "express-async-errors";

import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { errorMiddleware } from './middleware/erro';
const app = express();
app.use(express.json());
router(app);

app.get("/teste", ()=>{
  throw new Error("Erro teste");
})

//Para requisições síncronas
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => console.log("erro"));

export default app;
