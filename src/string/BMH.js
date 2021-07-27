const MAX_OF_CHAR = 256;

function badCharHeuristic(str){
    let barChar = new Array(MAX_OF_CHAR).fill(-1);
    for(let i = 0; i < str.length; i++){
        barChar[str.charCodeAt(i)] = i;
    }
    return barChar;
}

export function BMHSearch(str, pattern){
    const length = str.length;
    const patternLength = pattern.length;
    let i = 0;
    const badChar = badCharHeuristic(pattern);

    while(i <= length - patternLength){
        let j = patternLength - 1;

        while(j >= 0 && str[i + j] === pattern[j]){
            j--;
        }
        if(j === -1){
            console.log(`pattern ${pattern} find in index ${i} in str ${str}`);
            i += (i + patternLength < length) ? patternLength - badChar[str.charCodeAt(i + patternLength)] : 1;
        }
        else{
            i += Math.max(1, j - badChar[str.charCodeAt(i + j)]);
        }
    }
}