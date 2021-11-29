import { getRepository } from 'typeorm';
import { Poker } from '../models/entities/Poker';

export const saveDbPoker = async (pokerResult: any) => {
    const pokerRepository = getRepository(Poker);
    if(pokerResult.results.length !== 0) {
      await Promise.all(pokerResult.results.map(async (result: any) => {
        const resultObg: any = {
          request_id: result.requestId,
          hand: result.hand,
          result: result.yaku
        }
        return await pokerRepository.save(resultObg);
      }));
    }
    if(pokerResult.errors.length !== 0) {
      await Promise.all(pokerResult.errors.map(async (error: any) => {
        const errorMsg = error.errorMessages.join(',<br>')
        const errorObg: any = {
          request_id: error.requestId,
          hand: error.hand,
          result: errorMsg
        }
        return await pokerRepository.save(errorObg);
      }));
    }
}