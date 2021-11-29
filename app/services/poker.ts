type Result = {
  requestId: string;
  hand: string;
  yaku: string;
  strongest: boolean;
}
type Error = {
  requestId: string;
  hand: string;
  errorMessages: string[];
}

type OutputResult = {
  results: Result[];
  errors: Error[]
}

type Suits = string[];
type Roles = number[];

const roleRansks = [
  'ロイヤルフラッシュ',
  'ストレートフラッシュ',
  '4カード',
  'フルハウス',
  'フラッシュ',
  'ストレート',
  '3カード',
  '2ペア',
  '1ペア',
  'ハイカード'
];
 

export const poker = (inputHands: string[]) => {
  const hands = [...new Set(inputHands)];
  const outputReslt: OutputResult = {
    results: [],
    errors: []
  };
 
 // エラー処理
 const checkError = (hand: string, id: string) => {
  const redExpConmas = hand.match(/,/g);
  const comnaNum = redExpConmas !== null && redExpConmas.length;
   // カンマの数で文字の個数を検出
   const isLengthErr = comnaNum !== 4;
   // 1文字目が文字、2文字目が数値のチェック
   const firstChar = hand.slice(0, 1);
   const secondChar = hand.slice(1, 2);
   const isInvalidChar = !firstChar.match(/[a-z]/ || /[A-Z]/) || !secondChar.match(/[0-9]/);
   if (isLengthErr || isInvalidChar) {
     createErrorMsg(hand, id, isLengthErr, isInvalidChar)
     return true;
   }
   return false;
  }
 
 // エラーメッセージ作成
 const createErrorMsg = (hand: string, id: string, isLengthErr: boolean, isInvalidChar: boolean): void => {
    const errors = [];
     // 手札が5枚ではない場合はエラー
     if (isLengthErr) {
     errors.push({
       "requestId": `01-000002-${id}`,
       "hand": hand,
       "errorMessages": [
         "手札は5枚入力してください"
       ] 
     })
     }
     // itemの一文字目がアルファベットでない場合はエラー
     // itemの2文字目が数字でない場合はエラー
     if (isInvalidChar) {
       const includeVal = errors.find(error => {
         return error.hand === hand
        })
       if (includeVal && includeVal.hand) {
         includeVal.errorMessages.push('1番目のカードの値が不正です')
       } else {
         errors.push({
           "requestId": `01-000002-${id}`,
           "hand": hand,
           "errorMessages": [
             "手札は5枚入力してください"
           ] 
         })
       }
     }
     outputReslt.errors = errors;
  }
 
 // 手札を1文字目の文字列と2文字目の数値に分ける
   const createCharacters = (hand: string, id: string): boolean => {
    const splitHands = hand.split(',')
    const firstChars: Suits = [];
    const secondChars: Roles = []
    splitHands.forEach((hand, i) => {
     firstChars.push(hand.slice(0, 1));
     secondChars.push(parseInt(hand.slice(1, 2), 10));
   })
   // 小さい数字順に並び替える
   const sortedSecondChar = secondChars.slice().sort((a, b) => a < b ? -1 : 1)
   return checkResult(hand, id, firstChars, sortedSecondChar);
  }
 
  // 各手札の処理
  // 指定した数値が全て含まれいる
  const includedEveryNum = (secondChars: Roles): boolean => {
   const nums = [1, 10, 11, 12, 13];
   const checkIncludeNum = (num: number) => secondChars.includes(num) ? num : 0;
   return nums.every(num => num === checkIncludeNum(num))
 }
 
 // 数値が連番である
 const checkSerialNumber = (secondChars: Roles): boolean => {
   const sameNums: boolean[] = [];
   secondChars.forEach((char, i) => {
     if(i > 0) {
       sameNums.push(char === secondChars[i-1]+1)
     }
   })
   return sameNums.every((num) => num === true)
 }
 
 // 数字の処理
 const checkRole = (role: Roles) => {
   const fullhouse = [2, 3].every(num => role.indexOf(num) != -1)
   const twopear = role.reduce((prev, cur) => {
     return prev + (cur === 2 ? 1 : 0) 
   }, 0) === 2
   const highcard = role.every((o) => o === 1)
   if(fullhouse) return 'フルハウス';
 
   if(twopear) return '2ペア';
   if(highcard) return 'ハイカード';
   if(role.includes(4)) return '4カード';
   if(role.includes(3)) return '3カード';
   if(role.includes(2)) return '1ペア';
 }
 
  // 各役の処理
  const results: Result[] = [];
  const checkResult = (hand: string, id: string, firstChars: Suits, secondChars: Roles): boolean => {
  // 1文字目の文字が5枚とも同じか
  const isEverSameChar = firstChars.every((val) => val === firstChars[0])
  // 各役
  const duplicatedCount = secondChars.reduce((prev: {[key: string]: number}, cur: number) => {
    prev[cur] = prev[cur] ? ++prev[cur] : 1;
    return prev;
  }, {});
  const role = checkRole(Object.values(duplicatedCount))

  const isIncludedEveryNum = includedEveryNum(secondChars)
  const isSerialNumber = checkSerialNumber(secondChars)

  // ロイヤルフラッシュ
  // 1文字目の文字が5枚とも同じ
  // 2文字目の数字が1, 10, 11, 12, 13
  if (isEverSameChar && isIncludedEveryNum) {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "ロイヤルフラッシュ",
      "strongest": false
    })
    return true;
  }
  // ストレートフラッシュ
  // 1文字目の文字が5枚とも同じ
  // 2文字目の数字が全て連番
  if (isEverSameChar && isSerialNumber) {
    results.push({
    "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "ストレートフラッシュ",
      "strongest": false
    })
    return true;
  }
  // 4カード
  // 2文字目の数字が4個同じ
  if (role === '4カード') {
    results.push({
    "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "4カード",
      "strongest": false
    })
    return true;
  }
  // フルハウス
  // 2文字目の数字が3個同じ　かつ　2文字目の数字が2個同じ
  if (role === 'フルハウス') {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "フルハウス",
      "strongest": false
    })
    return true;
  }
  // フラッシュ
  // 1文字目の文字が5つ全て同じ
  if (isEverSameChar) {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "フラッシュ",
      "strongest": false
    })
    return true;
  }
  // ストレート
  // 2文字目の数字が連番
  if (isSerialNumber) {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "ストレート",
      "strongest": false
    })
    return true;
  }
  // 3カード
  // 2文字目の数字が同じものが3個
  if (role === '3カード') {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "3カード",
      "strongest": false
    })
    return true;
  }
  // 2ペア
  // 2文字目の数字が同じものが2個2set
  if (role === '2ペア') {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "2ペア",
      "strongest": false
    })
    return true;
  }
  // 1ペア
  // 2文字目の数字が同じものが2個
  if (role === '1ペア') {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "1ペア",
      "strongest": false
    })
    return true;
  }
  // ハイカード
  // 2文字目の数字が全て違う
  if (role === 'ハイカード') {
    results.push({
      "requestId": `01-000002-${id}`,
      "hand": hand,
      "yaku": "ハイカード",
      "strongest": false
    })
    return true;
  }
  return false;
}

  for(const [i,  hand] of hands.entries()) {
    const id = i < 10 ? `0${i+1}` : `${i}`;
    const hasError = checkError(hand, id);
    if(hasError) {
      break;
    }
    const resHand: boolean = createCharacters(hand, id);
    if(!resHand) {
      break;
    }
  }
  outputReslt.results = results;
 // roleRanks順に並び替える
 const orderRanks = outputReslt.results.sort((x, y) => {
  return roleRansks.indexOf(x.yaku) - roleRansks.indexOf(y.yaku);
 })
 
 // 最初の要素のstrongestだけtrueにする
 if(orderRanks.length !== 0) {
  orderRanks[0].strongest = true;
 }
 // 送られてきた手札の順に最後はsortする
 const sortedResults = orderRanks.slice().sort((x, y) => {
   return hands.indexOf(x.hand) - hands.indexOf(y.hand);
 })
 outputReslt.results = sortedResults;
 return outputReslt;
}