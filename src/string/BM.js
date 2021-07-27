const MAX_CHAR = 256;

function badChar(str){
  const length = str.length;
  let result = new Array(MAX_CHAR).fill(-1);
  for(let i = 0; i < length; i++){
    result[str.charCodeAt(i)] = i;
  }
  return result;
}

function suffix(str){
  let length = str.length;
  let result = new Array(length).fill(0);
  result[length - 1] = length;
  let lastMisMatchPos = length - 1;
  let lastMatchStartPos;
  for(let i = length - 2; i >= 0; i--){
    if(i > lastMisMatchPos && result[length - 1 - (lastMatchStartPos - i) < i - lastMisMatchPos]){
      result[i] = result[length - 1 - (lastMatchStartPos - i)];
    }
    else{
      if(i < lastMisMatchPos || lastMisMatchPos === -1){
        lastMisMatchPos = i;
      }
      lastMatchStartPos = i;
      while(lastMisMatchPos >= 0 && str[lastMisMatchPos] === str[length - 1 - (lastMatchStartPos - lastMisMatchPos)]){
        lastMisMatchPos--;
      }
      result[i] = lastMatchStartPos - lastMisMatchPos;
    }
  }
  return result;
}

function goodSuffix(str){
  const suffixArr = suffix(str);
  const length = str.length;
  let result = new Array(length).fill(length); // case 3 如果完全不存在和好后缀匹配的子串，则右移整个模式串。
  let i;

  // case 2 如果不存在和好后缀完全匹配的子串，则在好后缀中找到具有如下特征的最长子串,使得P[m-s…m]=P[0…s]。
  for(i = length - 1; i >= 0; i--){
    if(suffixArr[i] === i + 1){
      for(let j = 0; j < length - 1 - i; j++){
        if(result[j] === length){
          result[j] = length - 1 - i;
        }
      }
    }
  }

  // case 1 模式串中有子串和好后缀完全匹配，则将最靠右的那个子串移动到好后缀的位置继续进行匹配。
  for(i = 0; i < length - 2; i++){
    result[length - 1 - suffixArr[i]] = length - 1 - i;
  }

  return result;
}

export function BMSearch(str, pattern){
  const length = str.length;
  const patternLength = pattern.length;
  let i = 0;
  
  const badCharArr = badChar(pattern);
  const goodSuffixArr = goodSuffix(pattern);

  while(i <= length - patternLength){
    let j = patternLength - 1;
    while(j >= 0 && str[i + j] === pattern[j]){
      j--;
    }
    if(j === -1){
      console.log(`pattern ${pattern} find index ${i} in str ${str}`);
      i += goodSuffixArr[0];
    }
    else{
      i += Math.max(j - badCharArr[pattern.charCodeAt(j)], goodSuffixArr[j]);
    }
  }
}