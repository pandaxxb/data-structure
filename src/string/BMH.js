function getBadLocation(str, end, badChar){
  let index = end;
  while(index !== -1 && str[index] !== badChar){
      index--;
  }
  return index;
}

function search(str, pattern){
  const length = str.length;
  const patternLength = pattern.length;
  let i = patternLength - 1;
  let j = patternLength - 1;
  let arr = [];
  while(i < length){
      console.log(`i:${i}; j:${j}`);
      if(str[i] !== pattern[j]){
          const badIndex = getBadLocation(pattern, j, str[i]);
          j = patternLength - 1;
          i += patternLength - badIndex - 1;
      }
      else{
          if(j === 0){
              arr.push(i);
              i = i + patternLength;
              j = patternLength - 1;
          }
          else{
              --i;
              --j;
          }
      }
  }
  return arr.length ? arr : -1;
}