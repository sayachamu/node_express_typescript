import { poker } from './poker';

describe('test poker role', () => {
    it('h1,h2,h3,h4,h5の札が渡された時、結果はストーレトフラッシュ', () => {
        const hands = ["h1,h2,h3,h4,h5"];
        const result = poker(hands).results[0];
        expect(result.yaku).toBe('ストレートフラッシュ');
    });
    it('s1,h1,c1,d1,h5の札が渡された時、結果は4カード', () => {
        const hands = ["s1,h1,c1,d1,h5"];
        const result = poker(hands).results[0];
        expect(result.yaku).toBe('4カード');
    });
    it('ss1,dd2,c1,c2,c3,c4の札が渡された時、結果はエラー', () => {
        const hands = ["ss1,dd2,c1,c2,c3,c4"];
        const error = poker(hands).errors[0];
        const errorMessages = [ '手札は5枚入力してください', '1番目のカードの値が不正です' ];
        expect(error.errorMessages).toEqual(errorMessages);
    });
})