function getNext(str){
  let result = new Array(str.length);
  let i = 0;
  let j = -1;
  result[0] = -1;
  while(i < str.length - 1){
    if(j === -1 || str[i] === str[j]){
      result[++i] = ++j;
    }
    else{
      j = result[j];
    }
  }
  return result;
}

function getNextVal(str){
  let result = new Array(str.length);
  let i = 0;
  let j = -1;
  result[0] = -1;
  while(i < str.length - 1){
    if(j === -1 || str[i] === str[j]){
      ++i;
      ++j;
      if(str[i] === str[j]){
        result[i] = result[j]
      }
      else{
        result[i] = j;
      }
    }
    else{
      j = result[j];
    }
  }
  return result; 
}

export function KMP(str, subStr, usePro = true, start = 0){
  const length = str.length;
  const subLength = subStr.length;
  let i = start;
  let j = 0;
  const next = usePro ? getNextVal(subStr) : getNext(subStr);
  if(subLength > length || start > length - subLength) {
    return -1;
  }
  while(i < length && j < subLength){
    if(j === -1 || str[i] === subStr[j]){
      i++;
      j++;
    }
    else{
      j = next[j];
    }
  }
  if(j >= subLength){
    return i - subLength;
  }
  else{
    return -1;
  }
}

export function ArticleWordAnalysis(text){
  const regex = /[^(a-zA-Z|\s|\-|'|\d)]/gm;
  const wordList = text.replace(/\n+/gm, ' ').replace(regex, '').trim().split(' ');
  let map = new Map();
  wordList.forEach(e => {
    const word = e.toLowerCase();
    if(map.has(word)){
      map.set(word, map.get(word) + 1);
    }
    else{
      map.set(word, 1);
    }
  });
  return map;
}