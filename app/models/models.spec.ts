import { getRepository } from 'typeorm';
import { saveDbPoker } from './index';

jest.mock('typeorm', () => {
    return {
        getRepository: jest.fn(),
        PrimaryGeneratedColumn: () => {},
        PrimaryColumn: () => {},
        CreateDateColumn: () => {},
        Column: () => {},
        Entity: () => {}
    }
});

describe('Poker Registration', () => {
  describe('resultsがある場合', () => {
    it('saveの処理が実行されること', () => {
      const pokerResult: any = {
        "results": [
            {
              "requestId": "01-000002-01",
              "hand": "h1,h2,h3,h4,h5",
              "yaku": "ストレート",
              "strongest": false
            },
            {
              "requestId": "01-000002-02",
              "hand": "s1,h1,c1,d1,h5",
              "yaku": "4カード",
              "strongest": true
            }
          ]
      };
      pokerResult.results.length
      saveDbPoker(pokerResult)
      expect(getRepository).toHaveBeenCalled();
    })
  })

　describe('errorsがある場合', () => {
    it('saveの処理が実行されること', () => {
        const pokerResult: any = {
          "errors": [
            {
              "requestId": "01-000002-03",
              "hand": "ss1,dd2,c1,c2,c3,c4",
              "errorMessages": [
                "1番目のカードの値が不正です",
                "手札は5枚入力してください"
              ] 
            }
          ]
        }
        saveDbPoker(pokerResult)
        expect(getRepository).toHaveBeenCalled();
      })
   })
})