import { saveDbPoker } from '../models';
import { poker } from '../services/poker';

export const savePoker = async (req: any, res: any) => {
    const pokerResult = poker(req.body.hands);
    res.send(pokerResult);
    saveDbPoker(pokerResult);
  };