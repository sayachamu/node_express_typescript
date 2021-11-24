export const poker = (hands: any) => {
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
  // console.log('---input.hands', input.hands, '--nput', input)
  // const hands = input.hands;
  const outputReslt: any = {
    results: [],
    errors: []
  };
 
 // エラー処理
 //  const checkError = (hand, number) => {
   const checkError = (hand: any) => {
   const comnaNum = hand.match(/,/g).length
   // カンマの数で文字の個数を検出
   const isLengthErr = comnaNum !== 4;
   // 1文字目が文字、2文字目が数値のチェック
   const firstChar = hand.slice(0, 1);
   const secondChar = hand.slice(1, 2);
   const isInvalidChar = !firstChar.match(/[a-z]/ || /[A-Z]/) || !secondChar.match(/[0-9]/);
   if (isLengthErr || isInvalidChar) {
     // createErrorMsg(hand, number, isLengthErr, isInvalidChar)
     createErrorMsg(hand, isLengthErr, isInvalidChar)
     return true;
   }
   return false;
  }
 
 // エラーメッセージ作成
 //  const createErrorMsg = (hand, number, isLengthErr, isInvalidChar) => {
   const createErrorMsg = (hand: any, isLengthErr: any, isInvalidChar: any) => {
    const errors = [];
     // 手札が5枚ではない場合はエラー
     if (isLengthErr) {
     errors.push({
       // "requestId": `01-000002-${number}`,
       "requestId": '01-000002-03',
       "hand": hand,
       "errorMessages": [
         "手札は5枚入力してください"
       ] 
     })
     }
     // itemの一文字目がアルファベットでない場合はエラー
     // itemの2文字目が数字でない場合はエラー
     if (isInvalidChar) {
       // TODO ここは条件分岐せずにそのままメッセージpushしても良いかも？
       const includeVal = errors.find(error => {
        //  console.log('---error.hand', error.hand, '---hand', hand)
         return error.hand === hand
        })
      //  console.log('---includeVal', includeVal)
       if (includeVal && includeVal.hand) {
        //  console.log('----ダブってない？', includeVal.hand)
         includeVal.errorMessages.push('1番目のカードの値が不正です')
       } else {
         errors.push({
           // "requestId": `01-000002-${number}`,
           "requestId": '01-000002-03',
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
 //  const createCharacters = (hand, number) => {
   const createCharacters = (hand: any) => {
    const splitHands = hand.split(',')
    const firstChars: any = [];
    const secondChars: any = []
    splitHands.forEach((hand: any, i: any) => {
     firstChars.push(hand.slice(0, 1));
     secondChars.push(parseInt(hand.slice(1, 2), 10));
   })
   // 小さい数字順に並び替える
   const sortedSecondChar = secondChars.slice().sort((a: any, b: any) => a < b ? -1 : 1)
   // checkResult(hand, number, firstChars, sortedSecondChar)
   checkResult(hand, firstChars, sortedSecondChar)
  }
 
  // 各手札の処理
  // 指定した数値が全て含まれいる
  const includedEveryNum = (secondChars: any) => {
   const nums = [1, 10, 11, 12, 13];
   const checkIncludeNum = (num: any) => secondChars.includes(num) ? num : 0;
   return nums.every(num => num === checkIncludeNum(num))
 }
 
 // 数値が連番である
 const checkSerialNumber = (secondChars: any) => {
   const sameNums: any = [];
   secondChars.forEach((char: any, i: any) => {
     if(i > 0) {
       sameNums.push(char === secondChars[i-1]+1)
     }
   })
   return sameNums.every((num: any) => num === true)
 }
 
 // 各役の処理
 const checkRole = (val: any) => {
   const fullhouse = [2, 3].every(num => val.indexOf(num) != -1)
   const twopear = val.reduce((prev: any, cur: any) => {
     return prev + (cur === 2 ? 1 : 0) 
   }, 0) === 2
   const highcard = val.every((o: any) => o === 1)
   if(fullhouse) return 'フルハウス';
 
   if(twopear) return '2ペア';
   if(highcard) return 'ハイカード';
   if(val.includes(4)) return '4カード';
   if(val.includes(3)) return '3カード';
   if(val.includes(2)) return '1ペア';
 }
 
 // 各役の処理
 const results: any = [];
 // const checkResult = (hand, number, firstChars, secondChars) => {
   const checkResult = (hand: any, firstChars: any, secondChars: any) => {
   const includeVal = results.find((result: any) => result.hand === hand)
   // 1文字目の文字が5枚とも同じか
   const isEverSameChar = firstChars.every((val: any) => val === firstChars[0])
   // 各役
   const duplicatedCount = secondChars.reduce((prev: any, cur: any) => {
     prev[cur] = prev[cur] ? ++prev[cur] : 1;
     return prev;
   }, {});
   const role = checkRole(Object.values(duplicatedCount))
 
   const isIncludedEveryNum = includedEveryNum(secondChars)
   const isSerialNumber = checkSerialNumber(secondChars)
 
   // ロイヤルフラッシュ
   // 1文字目の文字が5枚とも同じ
   // 2文字目の数字が1, 10, 11, 12, 13
   // if (isEverSameChar && isIncludedEveryNum) {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "ロイヤルフラッシュ",
   //     "strongest": false
   //   })
 
   // }
   // ストレートフラッシュ
   // 1文字目の文字が5枚とも同じ
   // 2文字目の数字が全て連番
   if (isEverSameChar && isSerialNumber) {
     results.push({
      //  "requestId": `01-000002-${number}`,
      "requestId": `01-000002-01`,
       "hand": hand,
       "yaku": "ストレートフラッシュ",
       "strongest": false
     })
   }
   // 4カード
   // 2文字目の数字が4個同じ
   if (role === '4カード') {
     results.push({
       // "requestId": `01-000002-${number}`,
       "requestId": '01-000002-02',
       "hand": hand,
       "yaku": "4カード",
       "strongest": false
     })
 
   }
   // フルハウス
   // 2文字目の数字が3個同じ　かつ　2文字目の数字が2個同じ
   // if (role === 'フルハウス') {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "フルハウス",
   //     "strongest": false
   //   })
   // }
   // フラッシュ
   // 1文字目の文字が5つ全て同じ
   // if (isEverSameChar) {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "フラッシュ",
   //     "strongest": false
   //   })
   // }
   // ストレート
   // 2文字目の数字が連番
  //  if (isSerialNumber) {
  //    results.push({
  //      // "requestId": `01-000002-${number}`,
  //      "requestId": '01-000002-01',
  //      "hand": hand,
  //      "yaku": "ストレート",
  //      "strongest": false
  //    })
  //  }
   // 3カード
   // 2文字目の数字が同じものが3個
   // if (role === '3カード') {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "3カード",
   //     "strongest": false
   //   })
   // }
   // 2ペア
   // 2文字目の数字が同じものが2個2set
   // if (role === '2ペア') {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "2ペア",
   //     "strongest": false
   //   })
   // }
   // 1ペア
   // 2文字目の数字が同じものが2個
   // if (role === '1ペア') {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "1ペア",
   //     "strongest": false
   //   })
   // }
   // ハイカード
   // 2文字目の数字が全て違う
   // if (role === 'ハイカード') {
   //   results.push({
   //     "requestId": `01-000002-${number}`,
   //     "hand": hand,
   //     "yaku": "ハイカード",
   //     "strongest": false
   //   })
   // }
   const uniqueResults = results.filter((result: any, index: any, array: any) => {
     return array.findIndex((resultDuplicated: any) => result.hand === resultDuplicated.hand) === index;
   });
   outputReslt.results = uniqueResults;
  }

  hands.forEach((hand: any, i: any) => {
   // const number = i < 10 ? `0${i+1}` : i;
   // const hasError = checkError(hand, number);
   const hasError = checkError(hand);
   if (!hasError) {
     // createCharacters(hand, number)
     createCharacters(hand)
   }
 })
 // roleRanks順に並び替える
 const orderRanks = outputReslt.results.sort((x: any, y: any) => {
   return roleRansks.indexOf(x.yaku) - roleRansks.indexOf(y.yaku);
 })
 
 // // 最初の要素のstrongestだけtrueにする
 if(orderRanks.length !== 0) {
  orderRanks[0].strongest = true;
 }
 // // 送られてきた手札の順に最後はsortする
 const sortedResults = orderRanks.slice().sort((x: any, y: any) => {
   return hands.indexOf(x.hand) - hands.indexOf(y.hand);
 })
 outputReslt.results = sortedResults;
 return outputReslt;
}