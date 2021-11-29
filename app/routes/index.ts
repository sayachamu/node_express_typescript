import { savePoker } from "../services";

export const routes = (app: any) => {
  app.post('/', savePoker);
}