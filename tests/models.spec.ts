import { mockReq, mockRes } from 'sinon-express-mock'
import { Request, Response, NextFunction, request } from 'express';
import { savePoker } from '../app/routes/index'
import { getRepository } from 'typeorm';
import { Poker } from '../app/models/entities/Poker';

describe('Poker Registration', () => {
    it('Poker has proper data', async () => {
    const userRepository = getRepository(Poker);
  });
});