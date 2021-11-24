import { getRepository } from 'typeorm';
import { Poker } from '../models/entities/Poker';
import { poker } from '../services/poker';

export const savePoker = async (req: any, res: any) => {
  console.log('---pocker', poker(req.body.hands));
  const pokerResult = poker(req.body.hands);
  if(pokerResult.results.length !== 0) {
    const pokerRepository = getRepository(Poker);
    pokerResult.results.forEach(async (result: any) => {
      const resultObg: any = {
        request_id: result.requestId,
        hand: result.hand,
        result: result.yaku
      }
      const savedPoker = await pokerRepository.save(resultObg);
    
      console.log(savePoker)
    });
  }
};